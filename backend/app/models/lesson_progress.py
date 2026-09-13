from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.sql import func
from app.core.database import Base


class LessonProgress(Base):
    __tablename__ = "LessonProgress"

    LessonProgressID = Column(Integer, primary_key=True, index=True)
    EnrollmentID = Column(Integer, ForeignKey("Enrollments.EnrollmentID", ondelete="CASCADE"), nullable=False)
    LessonID = Column(Integer, ForeignKey("Lessons.LessonID", ondelete="CASCADE"), nullable=False)
    IsCompleted = Column(Boolean, default=True, nullable=False)
    CompletedAt = Column(DateTime, server_default=func.now(), nullable=False)

    __table_args__ = (
        UniqueConstraint("EnrollmentID", "LessonID", name="UQ_EnrollmentLessonProgress"),
    )
