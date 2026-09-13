from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.config import DEBUG, FRONTEND_URL
from app.core.database import get_db
from app.models.user_session import UserSession
from app.schemas.auth import ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest
from app.schemas.user import UserRegister, UserLogin
from app.services.auth_service import (
    register_user,
    login_user,
    issue_password_reset,
    reset_password,
    change_password,
    revoke_session,
    revoke_all_user_sessions,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    new_user = register_user(db, user)
    if new_user is None:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User registered successfully", "user_id": new_user.UserID}


@router.post("/login")
def login(request: Request, user: UserLogin, db: Session = Depends(get_db)):
    forwarded = request.headers.get("x-forwarded-for", "")
    ip_address = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else None)
    result = login_user(
        db,
        user.Email,
        user.Password,
        user_agent=request.headers.get("user-agent"),
        ip_address=ip_address,
    )
    if result is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return result


@router.get("/session")
def session_status(payload=Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(UserSession).filter(UserSession.SessionID == payload["session_id"]).first()
    if not item:
        raise HTTPException(status_code=401, detail="Session not found")
    return {
        "authenticated": True,
        "user_id": payload["user_id"],
        "role": payload.get("role"),
        "session_id": item.SessionID,
        "created_at": item.CreatedAt,
        "last_activity_at": item.LastActivityAt,
        "idle_expires_at": item.IdleExpiresAt,
        "expires_at": item.ExpiresAt,
    }


@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    token = issue_password_reset(db, data.Email)
    response = {"message": "If the account exists, password reset instructions have been created."}
    if DEBUG and token:
        response["reset_token"] = token
        response["reset_url"] = f"{FRONTEND_URL}/reset-password?token={token}"
    return response


@router.post("/reset-password")
def perform_reset(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    if not reset_password(db, data.Token, data.NewPassword):
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    return {"message": "Password reset successfully. Please sign in again."}


@router.put("/change-password")
def perform_change(data: ChangePasswordRequest, payload=Depends(get_current_user), db: Session = Depends(get_db)):
    if not change_password(db, int(payload["user_id"]), data.CurrentPassword, data.NewPassword):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    return {"message": "Password changed successfully. All sessions were signed out."}


@router.post("/logout")
def logout(payload=Depends(get_current_user), db: Session = Depends(get_db)):
    revoke_session(db, payload["session_id"])
    return {"message": "Logged out successfully"}


@router.post("/logout-all")
def logout_all(payload=Depends(get_current_user), db: Session = Depends(get_db)):
    count = revoke_all_user_sessions(db, int(payload["user_id"]))
    return {"message": "All sessions logged out", "revoked_sessions": count}
