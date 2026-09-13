from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.core.config import (
    SECRET_KEY,
    ALGORITHM,
    SESSION_IDLE_MINUTES,
    SESSION_ACTIVITY_UPDATE_SECONDS,
)
from app.core.database import get_db
from app.models.user import User
from app.models.user_session import UserSession

security = HTTPBearer()


def _unauthorized(detail: str = "Invalid or expired session") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    """Validate JWT + server-side session + active user.

    A copied or stale JWT is not enough: its session must still exist in Neon,
    must not be revoked, and must be inside both the idle and absolute timeout.
    """

    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise _unauthorized()

    if payload.get("type") != "access":
        raise _unauthorized("Invalid token type")

    user_id = payload.get("user_id")
    session_id = payload.get("sid")
    if not user_id or not session_id:
        raise _unauthorized("Session information is missing")

    now = datetime.now(timezone.utc)
    session = db.query(UserSession).filter(UserSession.SessionID == str(session_id)).first()
    if not session or session.UserID != int(user_id):
        raise _unauthorized()
    if session.RevokedAt is not None:
        raise _unauthorized("Session has been revoked")

    expires_at = session.ExpiresAt
    idle_expires_at = session.IdleExpiresAt
    # SQLite/local adapters can return naive values; normalize defensively.
    if expires_at and expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if idle_expires_at and idle_expires_at.tzinfo is None:
        idle_expires_at = idle_expires_at.replace(tzinfo=timezone.utc)

    if not expires_at or now >= expires_at:
        session.RevokedAt = now
        db.commit()
        raise _unauthorized("Session expired")
    if not idle_expires_at or now >= idle_expires_at:
        session.RevokedAt = now
        db.commit()
        raise _unauthorized("Session expired because of inactivity")

    user = db.query(User).filter(User.UserID == int(user_id)).first()
    if not user or not user.IsActive:
        session.RevokedAt = now
        db.commit()
        raise _unauthorized("Inactive or missing user")

    last_activity = session.LastActivityAt
    if last_activity and last_activity.tzinfo is None:
        last_activity = last_activity.replace(tzinfo=timezone.utc)
    if not last_activity or (now - last_activity).total_seconds() >= SESSION_ACTIVITY_UPDATE_SECONDS:
        session.LastActivityAt = now
        session.IdleExpiresAt = now + timedelta(minutes=SESSION_IDLE_MINUTES)
        db.commit()

    # Keep existing dependency contract: downstream code expects JWT-like data.
    payload["role"] = user.role.RoleName if user.role else payload.get("role")
    payload["session_id"] = session.SessionID
    return payload
