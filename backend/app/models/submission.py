from sqlalchemy import Column, Integer, Text, String, DateTime, ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Submission(Base):
    __tablename__ = "Submissions"
    SubmissionID = Column(Integer, primary_key=True, index=True)
    AssignmentID = Column(Integer, ForeignKey("Assignments.AssignmentID", ondelete="CASCADE"), nullable=False)
    StudentID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    AnswerText = Column(Text)
    AttachmentURL = Column(String(500))
    Marks = Column(Numeric(8, 2))
    Feedback = Column(Text)
    Status = Column(String(30), default="submitted")
    SubmittedAt = Column(DateTime, server_default=func.now())
    GradedAt = Column(DateTime)
    __table_args__ = (UniqueConstraint("AssignmentID", "StudentID", name="UQ_AssignmentStudent"),)
    assignment = relationship("Assignment", back_populates="submissions")
