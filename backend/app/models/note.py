from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class Note(Base):
    __tablename__ = "Notes"

    NoteID = Column(Integer, primary_key=True, index=True)

    CustomerID = Column(Integer, ForeignKey("Customers.CustomerID"), nullable=True)

    LeadID = Column(Integer, ForeignKey("Leads.LeadID"), nullable=True)

    DealID = Column(Integer, ForeignKey("Deals.DealID"), nullable=True)

    NoteText = Column(Text, nullable=False)

    CreatedBy = Column(Integer)

    CreatedAt = Column(DateTime, server_default=func.now())