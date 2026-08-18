from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class Deal(Base):
    __tablename__ = "Deals"

    DealID = Column(Integer, primary_key=True, index=True)

    CustomerID = Column(
        Integer,
        ForeignKey("Customers.CustomerID"),
        nullable=False
    )

    Title = Column(String(200), nullable=False)

    Amount = Column(Float, nullable=False)

    Stage = Column(String(100), default="New")

    ExpectedDate = Column(DateTime)

    AssignedTo = Column(Integer)

    CreatedAt = Column(
        DateTime,
        server_default=func.now()
    )