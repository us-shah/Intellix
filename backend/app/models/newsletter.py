from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Newsletter(Base):
    __tablename__ = "Newsletter"

    SubscriberID = Column(Integer, primary_key=True, index=True)

    Email = Column(String(200), unique=True, nullable=False)

    CreatedAt = Column(DateTime, server_default=func.now())