from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Job(Base):
    __tablename__ = "Jobs"

    JobID = Column(Integer, primary_key=True, index=True)

    Title = Column(String(200), nullable=False)

    Department = Column(String(100))

    Location = Column(String(150))

    EmploymentType = Column(String(50))

    Salary = Column(String(100))

    Description = Column(Text)

    Requirements = Column(Text)

    Status = Column(String(50), default="Open")

    CreatedAt = Column(DateTime, server_default=func.now())