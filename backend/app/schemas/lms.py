from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel


class CourseCreate(BaseModel):
    Title: str
    Slug: str
    ShortDescription: Optional[str] = None
    Description: Optional[str] = None
    Thumbnail: Optional[str] = None
    Price: Decimal = Decimal("0")
    Level: str = "Beginner"
    Status: str = "draft"
    InstructorID: Optional[int] = None
    IsPublished: bool = False


class CourseUpdate(BaseModel):
    Title: Optional[str] = None
    Slug: Optional[str] = None
    ShortDescription: Optional[str] = None
    Description: Optional[str] = None
    Thumbnail: Optional[str] = None
    Price: Optional[Decimal] = None
    Level: Optional[str] = None
    Status: Optional[str] = None
    InstructorID: Optional[int] = None
    IsPublished: Optional[bool] = None


class CourseResponse(CourseCreate):
    CourseID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True


class LessonCreate(BaseModel):
    Title: str
    Content: Optional[str] = None
    VideoURL: Optional[str] = None
    ResourceURL: Optional[str] = None
    SortOrder: int = 0
    IsPreview: bool = False


class LessonResponse(LessonCreate):
    LessonID: int
    CourseID: int

    class Config:
        from_attributes = True


class EnrollmentCreate(BaseModel):
    StudentID: int
    CourseID: int


class AssignmentCreate(BaseModel):
    CourseID: int
    Title: str
    Instructions: Optional[str] = None
    DueAt: Optional[datetime] = None
    MaxMarks: Decimal = Decimal("100")


class SubmissionCreate(BaseModel):
    AnswerText: Optional[str] = None
    AttachmentURL: Optional[str] = None


class GradeSubmission(BaseModel):
    Marks: Decimal
    Feedback: Optional[str] = None
