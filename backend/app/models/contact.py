from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Contact(Base):
    __tablename__ = "Contacts"

    ContactID = Column(Integer, primary_key=True, index=True)

    FullName = Column(String(150), nullable=False)

    Email = Column(String(200), nullable=False)

    Phone = Column(String(50))

    Subject = Column(String(250))

    Message = Column(Text)

    Status = Column(String(50), default="New")

    CreatedAt = Column(DateTime, server_default=func.now())