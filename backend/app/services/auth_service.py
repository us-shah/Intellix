from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import (
    create_access_token,
    create_password_reset_token,
    decode_password_reset_token,
)


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


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.Email == email.lower()).first()
    if not user or not user.IsActive or not verify_password(password, user.PasswordHash):
        return None

    role_name = user.role.RoleName if user.role else None
    token = create_access_token({
        "sub": user.Email,
        "user_id": user.UserID,
        "role": role_name,
    })
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": role_name,
        "user": {
            "UserID": user.UserID,
            "FullName": user.FullName,
            "Email": user.Email,
            "Phone": user.Phone,
            "Role": role_name,
        },
    }


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
    return True


def change_password(db: Session, user_id: int, current_password: str, new_password: str) -> bool:
    user = db.query(User).filter(User.UserID == user_id).first()
    if not user or not verify_password(current_password, user.PasswordHash):
        return False
    user.PasswordHash = hash_password(new_password)
    db.commit()
    return True
