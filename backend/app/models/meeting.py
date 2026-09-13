from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class Meeting(Base):
    __tablename__ = "Meetings"

    MeetingID = Column(Integer, primary_key=True, index=True)

    CustomerID = Column(Integer, ForeignKey("Customers.CustomerID"))

    Title = Column(String(200), nullable=False)

    MeetingDate = Column(DateTime, nullable=False)

    Location = Column(String(200))

    Description = Column(String(500))

    CreatedBy = Column(Integer)

    CreatedAt = Column(DateTime, server_default=func.now())