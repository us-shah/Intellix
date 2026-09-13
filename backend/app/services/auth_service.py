from datetime import datetime, timedelta, timezone
import secrets

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role
from app.models.user_session import UserSession
from app.models.permission import Permission
from app.models.role_permission import RolePermission
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import (
    create_access_token,
    create_password_reset_token,
    decode_password_reset_token,
)
from app.core.config import SESSION_IDLE_MINUTES, SESSION_ABSOLUTE_HOURS


def register_user(db: Session, user, role_name: str = "STUDENT"):
    existing_user = db.query(User).filter(User.Email == user.Email).first()
    if existing_user:
        return None

    role = db.query(Role).filter(Role.RoleName == role_name).first()
    if role is None:
        role = db.query(Role).first()
    if role is None:
        raise RuntimeError("No roles are configured in the database")

    new_user = User(
        FullName=user.FullName.strip(),
        Email=user.Email.lower(),
        Phone=user.Phone,
        PasswordHash=hash_password(user.Password),
        RoleID=role.RoleID,
        IsActive=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user



def get_user_permission_codes(db: Session, user: User) -> list[str]:
    role_name = user.role.RoleName.upper() if user.role and user.role.RoleName else ""
    if role_name == "SUPER_ADMIN":
        return ["*"]
    rows = (
        db.query(Permission.Code)
        .join(RolePermission, RolePermission.PermissionID == Permission.PermissionID)
        .filter(RolePermission.RoleID == user.RoleID)
        .order_by(Permission.Code)
        .all()
    )
    return [row[0] for row in rows]

def login_user(db: Session, email: str, password: str, user_agent: str | None = None, ip_address: str | None = None):
    user = db.query(User).filter(User.Email == email.lower()).first()
    if not user or not user.IsActive or not verify_password(password, user.PasswordHash):
        return None

    now = datetime.now(timezone.utc)
    session_id = secrets.token_urlsafe(32)
    session = UserSession(
        SessionID=session_id,
        UserID=user.UserID,
        UserAgent=(user_agent or "")[:500] or None,
        IPAddress=(ip_address or "")[:100] or None,
        LastActivityAt=now,
        ExpiresAt=now + timedelta(hours=SESSION_ABSOLUTE_HOURS),
        IdleExpiresAt=now + timedelta(minutes=SESSION_IDLE_MINUTES),
    )
    db.add(session)
    db.commit()

    role_name = user.role.RoleName if user.role else None
    permissions = get_user_permission_codes(db, user)
    token = create_access_token({
        "sub": user.Email,
        "user_id": user.UserID,
        "role": role_name,
        "sid": session_id,
    })
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": role_name,
        "permissions": permissions,
        "session": {
            "SessionID": session_id,
            "IdleTimeoutMinutes": SESSION_IDLE_MINUTES,
            "AbsoluteTimeoutHours": SESSION_ABSOLUTE_HOURS,
            "ExpiresAt": session.ExpiresAt.isoformat(),
        },
        "user": {
            "UserID": user.UserID,
            "FullName": user.FullName,
            "Email": user.Email,
            "Phone": user.Phone,
            "Role": role_name,
        },
    }


def revoke_session(db: Session, session_id: str) -> None:
    session = db.query(UserSession).filter(UserSession.SessionID == session_id).first()
    if session and session.RevokedAt is None:
        session.RevokedAt = datetime.now(timezone.utc)
        db.commit()


def revoke_all_user_sessions(db: Session, user_id: int) -> int:
    now = datetime.now(timezone.utc)
    rows = db.query(UserSession).filter(
        UserSession.UserID == user_id,
        UserSession.RevokedAt.is_(None),
    ).all()
    for item in rows:
        item.RevokedAt = now
    if rows:
        db.commit()
    return len(rows)


def issue_password_reset(db: Session, email: str):
    user = db.query(User).filter(User.Email == email.lower()).first()
    if not user or not user.IsActive:
        return None
    return create_password_reset_token(user.Email, user.UserID)


def reset_password(db: Session, token: str, new_password: str) -> bool:
    payload = decode_password_reset_token(token)
    if not payload:
        return False
    user = db.query(User).filter(User.UserID == payload.get("user_id")).first()
    if not user or user.Email.lower() != str(payload.get("sub", "")).lower():
        return False
    user.PasswordHash = hash_password(new_password)
    db.commit()
    revoke_all_user_sessions(db, user.UserID)
    return True


def change_password(db: Session, user_id: int, current_password: str, new_password: str) -> bool:
    user = db.query(User).filter(User.UserID == user_id).first()
    if not user or not verify_password(current_password, user.PasswordHash):
        return False
    user.PasswordHash = hash_password(new_password)
    db.commit()
    revoke_all_user_sessions(db, user.UserID)
    return True
