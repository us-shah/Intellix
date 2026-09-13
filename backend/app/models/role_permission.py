from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base

class RolePermission(Base):
    __tablename__ = "RolePermissions"
    RolePermissionID = Column(Integer, primary_key=True, index=True)
    RoleID = Column(Integer, ForeignKey("Roles.RoleID", ondelete="CASCADE"), nullable=False)
    PermissionID = Column(Integer, ForeignKey("Permissions.PermissionID", ondelete="CASCADE"), nullable=False)
    __table_args__ = (UniqueConstraint("RoleID", "PermissionID", name="UQ_RolePermission"),)
    role = relationship("Role", back_populates="permissions")
    permission = relationship("Permission", back_populates="roles")
