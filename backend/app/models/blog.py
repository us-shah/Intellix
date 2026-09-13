from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Blog(Base):
    __tablename__ = "Blogs"

    BlogID = Column(Integer, primary_key=True, index=True)

    Title = Column(String(250), nullable=False)

    Slug = Column(String(250), unique=True)

    Summary = Column(Text)

    Content = Column(Text)

    Image = Column(String(500))

    Author = Column(String(150))

    Status = Column(String(50), default="Draft")

    CreatedAt = Column(DateTime, server_default=func.now())