from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.role_checker import RoleChecker
from app.dependencies.permission_checker import require_permission
from app.models.role import Role
from app.schemas.role import RoleCreate, RoleUpdate
from app.services.role_service import create_role, get_roles, get_role, update_role, delete_role

router = APIRouter(prefix="/roles", tags=["Roles"])

can_view_roles = require_permission("users.view")
super_admin_only = RoleChecker(["SUPER_ADMIN"])
PROTECTED_ROLES = {"SUPER_ADMIN", "STUDENT", "CLIENT"}


@router.post("/")
def add_role(role: RoleCreate, db: Session = Depends(get_db), current_user=Depends(super_admin_only)):
    normalized = role.RoleName.strip().upper().replace(" ", "_")
    if db.query(Role).filter(Role.RoleName == normalized).first():
        raise HTTPException(status_code=400, detail="Role already exists")
    role.RoleName = normalized
    return create_role(db, role)


@router.get("/")
def all_roles(db: Session = Depends(get_db), current_user=Depends(can_view_roles)):
    return get_roles(db)


@router.get("/{role_id}")
def single_role(role_id: int, db: Session = Depends(get_db), current_user=Depends(can_view_roles)):
    role = get_role(db, role_id)
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return role


@router.put("/{role_id}")
def edit_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db), current_user=Depends(super_admin_only)):
    existing = get_role(db, role_id)
    if existing is None:
        raise HTTPException(status_code=404, detail="Role not found")
    if existing.RoleName == "SUPER_ADMIN":
        raise HTTPException(status_code=400, detail="SUPER_ADMIN is a protected system role")
    role.RoleName = role.RoleName.strip().upper().replace(" ", "_")
    return update_role(db, role_id, role)


@router.delete("/{role_id}")
def remove_role(role_id: int, db: Session = Depends(get_db), current_user=Depends(super_admin_only)):
    existing = get_role(db, role_id)
    if existing is None:
        raise HTTPException(status_code=404, detail="Role not found")
    if existing.RoleName in PROTECTED_ROLES:
        raise HTTPException(status_code=400, detail=f"{existing.RoleName} is a protected system role")
    if existing.users:
        raise HTTPException(status_code=400, detail="Role is assigned to users. Reassign them before deleting it.")
    return delete_role(db, role_id)
