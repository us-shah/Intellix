from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class ClientProfile(Base):
    __tablename__ = "ClientProfiles"
    ClientProfileID = Column(Integer, primary_key=True, index=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), unique=True, nullable=False)
    CompanyName = Column(String(160), nullable=False)
    Industry = Column(String(100))
    Website = Column(String(255))
    Address = Column(String(500))
    Status = Column(String(30), default="active")
    CreatedAt = Column(DateTime, server_default=func.now())
