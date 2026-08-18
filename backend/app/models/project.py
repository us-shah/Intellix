from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class Project(Base):
    __tablename__ = "Projects"

    ProjectID = Column(Integer, primary_key=True, index=True)

    ProjectName = Column(String(200), nullable=False)

    Description = Column(String(1000))

    CustomerID = Column(Integer, ForeignKey("Customers.CustomerID"))

    ManagerID = Column(Integer, ForeignKey("Users.UserID"))

    Status = Column(String(50))

    StartDate = Column(DateTime)

    EndDate = Column(DateTime)

    CreatedAt = Column(DateTime, server_default=func.now())