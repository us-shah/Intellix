from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.role import RoleCreate, RoleUpdate
from app.services.role_service import (
    create_role,
    get_roles,
    get_role,
    update_role,
    delete_role,
)

router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


@router.post("/")
def add_role(
    role: RoleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_role(db, role)


@router.get("/")
def all_roles(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_roles(db)


@router.get("/{role_id}")
def single_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    role = get_role(db, role_id)

    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")

    return role


@router.put("/{role_id}")
def edit_role(
    role_id: int,
    role: RoleUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_role(db, role_id, role)

    if updated is None:
        raise HTTPException(status_code=404, detail="Role not found")

    return updated


@router.delete("/{role_id}")
def remove_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_role(db, role_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Role not found")

    return deleted