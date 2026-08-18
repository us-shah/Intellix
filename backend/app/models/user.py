from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "Users"

    UserID = Column(Integer, primary_key=True, index=True)

    FullName = Column(String(100), nullable=False)

    Email = Column(String(100), unique=True, nullable=False)

    Phone = Column(String(20))

    PasswordHash = Column(String(255), nullable=False)

    RoleID = Column(Integer, ForeignKey("Roles.RoleID"))

    IsActive = Column(Boolean, default=True)

    CreatedAt = Column(DateTime, server_default=func.now())

    UpdatedAt = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    role = relationship("Role", back_populates="users")