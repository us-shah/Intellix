from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class ActivityLog(Base):
    __tablename__ = "ActivityLogs"

    ActivityID = Column(Integer, primary_key=True, index=True)

    UserID = Column(Integer, ForeignKey("Users.UserID"))

    Action = Column(String(50), nullable=False)

    TableName = Column(String(100), nullable=False)

    RecordID = Column(Integer, nullable=False)

    ActionTime = Column(DateTime(timezone=True), server_default=func.now())