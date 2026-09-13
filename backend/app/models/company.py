from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Company(Base):
    __tablename__ = "Companies"

    CompanyID = Column(Integer, primary_key=True, index=True)

    CompanyName = Column(String(200), nullable=False)

    Industry = Column(String(100))

    Website = Column(String(200))

    Email = Column(String(200))

    Phone = Column(String(50))

    Address = Column(String(255))

    City = Column(String(100))

    Country = Column(String(100))

    CreatedAt = Column(DateTime, server_default=func.now())