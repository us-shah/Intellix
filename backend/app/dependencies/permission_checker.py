from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.models.permission import Permission
from app.models.role_permission import RolePermission

def require_permission(code: str):
    def checker(payload=Depends(get_current_user), db: Session = Depends(get_db)):
        user = db.query(User).filter(User.UserID == payload.get("user_id")).first()
        if not user or not user.IsActive:
            raise HTTPException(status_code=401, detail="Inactive or missing user")
        if user.role and user.role.RoleName.upper() == "SUPER_ADMIN":
            return user
        allowed = db.query(RolePermission).join(Permission).filter(
            RolePermission.RoleID == user.RoleID,
            Permission.Code == code,
        ).first()
        if not allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Missing permission: {code}")
        return user
    return checker
