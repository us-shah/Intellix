from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class Notification(Base):
    __tablename__ = "Notifications"

    NotificationID = Column(Integer, primary_key=True, index=True)

    UserID = Column(Integer, ForeignKey("Users.UserID"))

    Title = Column(String(200), nullable=False)

    Message = Column(String(500), nullable=False)

    IsRead = Column(Boolean, default=False)

    CreatedAt = Column(DateTime(timezone=True), server_default=func.now())