from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.Password)

    new_user = User(
        FullName=user.FullName,
        Email=user.Email,
        Phone=user.Phone,
        PasswordHash=hashed_password,
        RoleID=user.RoleID,
        IsActive=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_users(db: Session):
    return db.query(User).all()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.UserID == user_id).first()


def update_user(db: Session, user_id: int, user: UserUpdate):
    existing = db.query(User).filter(User.UserID == user_id).first()

    if not existing:
        return None

    existing.FullName = user.FullName
    existing.Email = user.Email
    existing.Phone = user.Phone
    existing.RoleID = user.RoleID
    existing.IsActive = user.IsActive

    db.commit()
    db.refresh(existing)

    return existing


def delete_user(db: Session, user_id: int):
    existing = db.query(User).filter(User.UserID == user_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "User deleted successfully"}