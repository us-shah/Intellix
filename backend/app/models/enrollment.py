from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Enrollment(Base):
    __tablename__ = "Enrollments"
    EnrollmentID = Column(Integer, primary_key=True, index=True)
    StudentID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    CourseID = Column(Integer, ForeignKey("Courses.CourseID", ondelete="CASCADE"), nullable=False)
    Status = Column(String(30), default="active")
    ProgressPercent = Column(Numeric(5, 2), default=0)
    EnrolledAt = Column(DateTime, server_default=func.now())
    CompletedAt = Column(DateTime)
    __table_args__ = (UniqueConstraint("StudentID", "CourseID", name="UQ_StudentCourse"),)
    course = relationship("Course", back_populates="enrollments")
