from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Permission(Base):
    __tablename__ = "Permissions"
    PermissionID = Column(Integer, primary_key=True, index=True)
    Code = Column(String(100), unique=True, nullable=False, index=True)
    Name = Column(String(120), nullable=False)
    Description = Column(String(255))
    CreatedAt = Column(DateTime, server_default=func.now())
    roles = relationship("RolePermission", back_populates="permission", cascade="all, delete-orphan")
