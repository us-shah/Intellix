from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.user import UserCreate, UserUpdate
from app.services.user_service import (
    create_user,
    get_users,
    get_user,
    update_user,
    delete_user,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/")
def add_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_user(db, user)


@router.get("/")
def all_users(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_users(db)


@router.get("/{user_id}")
def single_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_user(db, user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.put("/{user_id}")
def edit_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_user(db, user_id, user)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return updated


@router.delete("/{user_id}")
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_user(db, user_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return deleted