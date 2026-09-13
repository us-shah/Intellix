from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.dependencies.role_checker import RoleChecker
from app.dependencies.permission_checker import require_permission
from app.models.activity_log import ActivityLog
from app.models.role import Role
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserRoleAssign, UserActiveUpdate
from app.services.auth_service import revoke_all_user_sessions
from app.services.user_service import create_user, get_users, get_user, update_user, delete_user

router = APIRouter(prefix="/users", tags=["Users"])

can_view_users = require_permission("users.view")
super_admin_only = RoleChecker(["SUPER_ADMIN"])


def _serialize(user: User) -> dict:
    return {
        "UserID": user.UserID,
        "FullName": user.FullName,
        "Email": user.Email,
        "Phone": user.Phone,
        "RoleID": user.RoleID,
        "RoleName": user.role.RoleName if user.role else None,
        "IsActive": user.IsActive,
        "CreatedAt": user.CreatedAt,
        "UpdatedAt": user.UpdatedAt,
    }


@router.post("/")
def add_user(user: UserCreate, db: Session = Depends(get_db), current_user=Depends(super_admin_only)):
    if not db.query(Role).filter(Role.RoleID == user.RoleID).first():
        raise HTTPException(status_code=400, detail="Role does not exist")
    created = create_user(db, user)
    return _serialize(created)


@router.get("/")
def all_users(db: Session = Depends(get_db), current_user=Depends(can_view_users)):
    users = db.query(User).options(joinedload(User.role)).order_by(User.UserID).all()
    return [_serialize(item) for item in users]


@router.get("/{user_id}")
def single_user(user_id: int, db: Session = Depends(get_db), current_user=Depends(can_view_users)):
    user = db.query(User).options(joinedload(User.role)).filter(User.UserID == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return _serialize(user)


@router.put("/{user_id}")
def edit_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db), current_user=Depends(super_admin_only)):
    updated = update_user(db, user_id, user)
    if updated is None:
        raise HTTPException(status_code=404, detail="User not found")
    return _serialize(db.query(User).options(joinedload(User.role)).filter(User.UserID == user_id).first())


@router.patch("/{user_id}/role")
def assign_user_role(
    user_id: int,
    data: UserRoleAssign,
    db: Session = Depends(get_db),
    current_user=Depends(super_admin_only),
):
    """Assign an Intellix role. Only SUPER_ADMIN can call this endpoint."""
    target = db.query(User).options(joinedload(User.role)).filter(User.UserID == user_id).first()
    role = db.query(Role).filter(Role.RoleID == data.RoleID).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    old_role = target.role.RoleName if target.role else "NONE"
    if old_role == "SUPER_ADMIN" and role.RoleName != "SUPER_ADMIN":
        super_admin_count = (
            db.query(User)
            .join(Role, User.RoleID == Role.RoleID)
            .filter(Role.RoleName == "SUPER_ADMIN", User.IsActive.is_(True))
            .count()
        )
        if super_admin_count <= 1:
            raise HTTPException(status_code=400, detail="You cannot remove the last active SUPER_ADMIN")

    target.RoleID = role.RoleID
    db.add(ActivityLog(
        UserID=current_user.UserID,
        Action=f"ROLE:{old_role}->{role.RoleName}",
        TableName="Users",
        RecordID=target.UserID,
    ))
    db.commit()
    db.refresh(target)

    # Old JWTs contain the previous role. Revoke them so the user must sign in again.
    revoke_all_user_sessions(db, target.UserID)
    return {
        "message": "Role assigned successfully. Existing sessions were revoked.",
        "user": _serialize(db.query(User).options(joinedload(User.role)).filter(User.UserID == user_id).first()),
    }


@router.patch("/{user_id}/active")
def set_user_active(
    user_id: int,
    data: UserActiveUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(super_admin_only),
):
    target = db.query(User).filter(User.UserID == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if target.UserID == current_user.UserID and not data.IsActive:
        raise HTTPException(status_code=400, detail="You cannot deactivate your own SUPER_ADMIN account")
    target.IsActive = data.IsActive
    db.commit()
    if not data.IsActive:
        revoke_all_user_sessions(db, target.UserID)
    return {"message": "User status updated", "IsActive": target.IsActive}


@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db), current_user=Depends(super_admin_only)):
    if user_id == current_user.UserID:
        raise HTTPException(status_code=400, detail="You cannot delete your own SUPER_ADMIN account")
    deleted = delete_user(db, user_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted
