from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.config import DEBUG, FRONTEND_URL
from app.core.database import get_db
from app.schemas.auth import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ChangePasswordRequest,
)
from app.schemas.user import UserRegister, UserLogin
from app.services.auth_service import (
    register_user,
    login_user,
    issue_password_reset,
    reset_password,
    change_password,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    new_user = register_user(db, user)
    if new_user is None:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User registered successfully", "user_id": new_user.UserID}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, user.Email, user.Password)
    if result is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return result


@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    token = issue_password_reset(db, data.Email)
    response = {"message": "If the account exists, password reset instructions have been created."}
    # Development convenience. In production, email this URL and set DEBUG=false.
    if DEBUG and token:
        response["reset_token"] = token
        response["reset_url"] = f"{FRONTEND_URL}/reset-password?token={token}"
    return response


@router.post("/reset-password")
def perform_reset(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    if not reset_password(db, data.Token, data.NewPassword):
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    return {"message": "Password reset successfully"}


@router.put("/change-password")
def perform_change(
    data: ChangePasswordRequest,
    payload=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not change_password(db, int(payload["user_id"]), data.CurrentPassword, data.NewPassword):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    return {"message": "Password changed successfully"}


@router.post("/logout")
def logout(_payload=Depends(get_current_user)):
    # Access tokens are stateless. The frontend removes its cookie on logout.
    return {"message": "Logged out successfully"}
