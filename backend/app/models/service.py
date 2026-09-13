from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Service(Base):
    __tablename__ = "Services"

    ServiceID = Column(Integer, primary_key=True, index=True)

    ServiceName = Column(String(200), nullable=False)

    Description = Column(Text)

    Icon = Column(String(100))

    Status = Column(String(50), default="Active")

    CreatedAt = Column(DateTime, server_default=func.now())