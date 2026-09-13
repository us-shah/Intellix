from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Numeric
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Assignment(Base):
    __tablename__ = "Assignments"
    AssignmentID = Column(Integer, primary_key=True, index=True)
    CourseID = Column(Integer, ForeignKey("Courses.CourseID", ondelete="CASCADE"), nullable=False)
    Title = Column(String(180), nullable=False)
    Instructions = Column(Text)
    DueAt = Column(DateTime)
    MaxMarks = Column(Numeric(8, 2), default=100)
    CreatedAt = Column(DateTime, server_default=func.now())
    course = relationship("Course", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment", cascade="all, delete-orphan")
