from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class Customer(Base):
    __tablename__ = "Customers"

    CustomerID = Column(Integer, primary_key=True, index=True)

    FirstName = Column(String(100), nullable=False)

    LastName = Column(String(100))

    Email = Column(String(150))

    Phone = Column(String(30))

    Address = Column(String(255))

    City = Column(String(100))

    Country = Column(String(100))

    CompanyID = Column(Integer, ForeignKey("Companies.CompanyID"))

    CreatedAt = Column(DateTime, server_default=func.now())