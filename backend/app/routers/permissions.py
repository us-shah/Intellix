from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.permission import Permission
from app.models.role import Role
from app.models.role_permission import RolePermission
from app.schemas.permission import PermissionCreate, PermissionResponse, RolePermissionAssign
from app.dependencies.role_checker import RoleChecker

router = APIRouter(prefix="/permissions", tags=["Permissions"])
super_admin_only = RoleChecker(["SUPER_ADMIN"])


@router.get("/", response_model=list[PermissionResponse])
def list_permissions(db: Session = Depends(get_db), _=Depends(super_admin_only)):
    return db.query(Permission).order_by(Permission.Code).all()


@router.post("/", response_model=PermissionResponse)
def create_permission(data: PermissionCreate, db: Session = Depends(get_db), _=Depends(super_admin_only)):
    if db.query(Permission).filter(Permission.Code == data.Code).first():
        raise HTTPException(400, "Permission code already exists")
    item = Permission(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/roles/{role_id}")
def get_role_permissions(role_id: int, db: Session = Depends(get_db), _=Depends(super_admin_only)):
    role = db.query(Role).filter(Role.RoleID == role_id).first()
    if not role:
        raise HTTPException(404, "Role not found")
    rows = db.query(RolePermission).filter(RolePermission.RoleID == role_id).all()
    return {"RoleID": role_id, "PermissionIDs": [row.PermissionID for row in rows]}


@router.put("/roles/{role_id}")
def assign_permissions(role_id: int, data: RolePermissionAssign, db: Session = Depends(get_db), _=Depends(super_admin_only)):
    role = db.query(Role).filter(Role.RoleID == role_id).first()
    if not role:
        raise HTTPException(404, "Role not found")
    if role.RoleName == "SUPER_ADMIN":
        return {"message": "SUPER_ADMIN bypasses permission checks and always has full access"}

    valid_ids = {row.PermissionID for row in db.query(Permission).filter(Permission.PermissionID.in_(data.PermissionIDs)).all()} if data.PermissionIDs else set()
    if len(valid_ids) != len(set(data.PermissionIDs)):
        raise HTTPException(400, "One or more permission IDs are invalid")

    db.query(RolePermission).filter(RolePermission.RoleID == role_id).delete()
    for permission_id in sorted(valid_ids):
        db.add(RolePermission(RoleID=role_id, PermissionID=permission_id))
    db.commit()
    return {"message": "Permissions assigned", "PermissionIDs": sorted(valid_ids)}
