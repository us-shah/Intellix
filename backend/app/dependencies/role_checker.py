from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User

class RoleChecker:
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = {r.upper() for r in allowed_roles}

    def __call__(self, payload=Depends(get_current_user), db: Session = Depends(get_db)):
        user = db.query(User).filter(User.UserID == payload.get("user_id")).first()
        role_name = (user.role.RoleName if user and user.role else "").upper()
        if not user or role_name not in self.allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
        return user
