from sqlalchemy.orm import Session

from app.models.user import User
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import create_access_token


def register_user(db: Session, user):
    existing_user = db.query(User).filter(User.Email == user.Email).first()

    if existing_user:
        return None

    new_user = User(
        FullName=user.FullName,
        Email=user.Email,
        Phone=user.Phone,
        PasswordHash=hash_password(user.Password),
        RoleID=3,  # Employee
        IsActive=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.Email == email).first()

    if not user:
        return None

    if not verify_password(password, user.PasswordHash):
        return None

    token = create_access_token(
        {
            "sub": user.Email,
            "user_id": user.UserID
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }