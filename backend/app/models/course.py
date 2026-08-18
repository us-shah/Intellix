from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Numeric
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Course(Base):
    __tablename__ = "Courses"
    CourseID = Column(Integer, primary_key=True, index=True)
    Title = Column(String(180), nullable=False)
    Slug = Column(String(200), unique=True, nullable=False, index=True)
    ShortDescription = Column(String(500))
    Description = Column(Text)
    Thumbnail = Column(String(500))
    Price = Column(Numeric(12, 2), default=0)
    Level = Column(String(30), default="Beginner")
    Status = Column(String(30), default="draft")
    InstructorID = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    IsPublished = Column(Boolean, default=False)
    CreatedAt = Column(DateTime, server_default=func.now())
    UpdatedAt = Column(DateTime, server_default=func.now(), onupdate=func.now())
    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")
