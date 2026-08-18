from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.permission import Permission
from app.models.role_permission import RolePermission
from app.schemas.permission import PermissionCreate, PermissionResponse, RolePermissionAssign
from app.dependencies.role_checker import RoleChecker

router = APIRouter(prefix="/permissions", tags=["Permissions"])
admin_only = RoleChecker(["SUPER_ADMIN", "ADMIN"])

@router.get("/", response_model=list[PermissionResponse])
def list_permissions(db: Session = Depends(get_db), _=Depends(admin_only)):
    return db.query(Permission).order_by(Permission.Code).all()

@router.post("/", response_model=PermissionResponse)
def create_permission(data: PermissionCreate, db: Session = Depends(get_db), _=Depends(admin_only)):
    if db.query(Permission).filter(Permission.Code == data.Code).first():
        raise HTTPException(400, "Permission code already exists")
    item = Permission(**data.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    return item

@router.put("/roles/{role_id}")
def assign_permissions(role_id: int, data: RolePermissionAssign, db: Session = Depends(get_db), _=Depends(admin_only)):
    db.query(RolePermission).filter(RolePermission.RoleID == role_id).delete()
    for permission_id in data.PermissionIDs:
        db.add(RolePermission(RoleID=role_id, PermissionID=permission_id))
    db.commit()
    return {"message": "Permissions assigned"}
