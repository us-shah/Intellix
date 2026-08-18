from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Role(Base):
    __tablename__ = "Roles"

    RoleID = Column(Integer, primary_key=True, index=True)
    RoleName = Column(String(50), unique=True)
    Description = Column(String(255))

    CreatedAt = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", back_populates="role")
    permissions = relationship("RolePermission", back_populates="role", cascade="all, delete-orphan")
