from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Task(Base):
    __tablename__ = "Tasks"

    TaskID = Column(Integer, primary_key=True, index=True)

    Title = Column(String(200), nullable=False)
    Description = Column(String)
    AssignedTo = Column(Integer)
    Priority = Column(String(20))
    Status = Column(String(20))
    DueDate = Column(DateTime)

    CreatedAt = Column(DateTime, server_default=func.now())