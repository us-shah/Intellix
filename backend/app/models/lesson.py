from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Lesson(Base):
    __tablename__ = "Lessons"
    LessonID = Column(Integer, primary_key=True, index=True)
    CourseID = Column(Integer, ForeignKey("Courses.CourseID", ondelete="CASCADE"), nullable=False)
    Title = Column(String(180), nullable=False)
    Content = Column(Text)
    VideoURL = Column(String(500))
    ResourceURL = Column(String(500))
    SortOrder = Column(Integer, default=0)
    IsPreview = Column(Boolean, default=False)
    CreatedAt = Column(DateTime, server_default=func.now())
    course = relationship("Course", back_populates="lessons")
