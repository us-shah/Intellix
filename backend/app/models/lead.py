from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.sql import func

from app.core.database import Base


class Lead(Base):
    __tablename__ = "Leads"

    LeadID = Column(Integer, primary_key=True, index=True)
    FullName = Column(String(150), nullable=False)
    Email = Column(String(200))
    Phone = Column(String(50))
    Source = Column(String(100))
    Status = Column(String(50), default="New")
    CompanyID = Column(Integer, ForeignKey("Companies.CompanyID"), nullable=True)
    AssignedTo = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    CreatedAt = Column(DateTime, server_default=func.now())
