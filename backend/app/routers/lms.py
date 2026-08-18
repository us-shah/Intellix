from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.database import get_db
from app.models.course import Course
from app.models.lesson import Lesson
from app.models.enrollment import Enrollment
from app.models.assignment import Assignment
from app.models.submission import Submission
from app.schemas.lms import *
from app.dependencies.role_checker import RoleChecker

router = APIRouter(prefix="/lms", tags=["LMS"])
staff = RoleChecker(["SUPER_ADMIN", "ADMIN", "INSTRUCTOR"])
student_or_staff = RoleChecker(["SUPER_ADMIN", "ADMIN", "INSTRUCTOR", "STUDENT"])

@router.get("/courses", response_model=list[CourseResponse])
def courses(db: Session = Depends(get_db), _=Depends(student_or_staff)):
    return db.query(Course).order_by(Course.CreatedAt.desc()).all()

@router.post("/courses", response_model=CourseResponse)
def create_course(data: CourseCreate, db: Session = Depends(get_db), _=Depends(staff)):
    if db.query(Course).filter(Course.Slug == data.Slug).first():
        raise HTTPException(400, "Course slug already exists")
    item = Course(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.put("/courses/{course_id}", response_model=CourseResponse)
def update_course(course_id: int, data: CourseUpdate, db: Session = Depends(get_db), _=Depends(staff)):
    item = db.get(Course, course_id)
    if not item: raise HTTPException(404, "Course not found")
    for k,v in data.model_dump().items(): setattr(item,k,v)
    db.commit(); db.refresh(item); return item

@router.post("/courses/{course_id}/lessons", response_model=LessonResponse)
def add_lesson(course_id: int, data: LessonCreate, db: Session = Depends(get_db), _=Depends(staff)):
    if not db.get(Course, course_id): raise HTTPException(404, "Course not found")
    item = Lesson(CourseID=course_id, **data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/courses/{course_id}/lessons", response_model=list[LessonResponse])
def lessons(course_id: int, db: Session = Depends(get_db), _=Depends(student_or_staff)):
    return db.query(Lesson).filter(Lesson.CourseID == course_id).order_by(Lesson.SortOrder).all()

@router.post("/enrollments")
def enroll(data: EnrollmentCreate, db: Session = Depends(get_db), _=Depends(staff)):
    existing = db.query(Enrollment).filter(Enrollment.StudentID==data.StudentID, Enrollment.CourseID==data.CourseID).first()
    if existing: raise HTTPException(400, "Student already enrolled")
    item=Enrollment(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/my-courses")
def my_courses(db: Session = Depends(get_db), user=Depends(student_or_staff)):
    rows=db.query(Enrollment).filter(Enrollment.StudentID==user.UserID).all()
    return [{"enrollment_id":r.EnrollmentID,"status":r.Status,"progress":float(r.ProgressPercent or 0),"course":r.course} for r in rows]

@router.post("/assignments")
def create_assignment(data: AssignmentCreate, db: Session = Depends(get_db), _=Depends(staff)):
    item=Assignment(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.post("/assignments/{assignment_id}/submit")
def submit(assignment_id:int, data:SubmissionCreate, db:Session=Depends(get_db), user=Depends(student_or_staff)):
    existing=db.query(Submission).filter(Submission.AssignmentID==assignment_id, Submission.StudentID==user.UserID).first()
    if existing:
        existing.AnswerText=data.AnswerText; existing.AttachmentURL=data.AttachmentURL; existing.SubmittedAt=datetime.utcnow(); existing.Status="submitted"
        item=existing
    else:
        item=Submission(AssignmentID=assignment_id, StudentID=user.UserID, **data.model_dump()); db.add(item)
    db.commit(); db.refresh(item); return item

@router.put("/submissions/{submission_id}/grade")
def grade(submission_id:int, data:GradeSubmission, db:Session=Depends(get_db), _=Depends(staff)):
    item=db.get(Submission, submission_id)
    if not item: raise HTTPException(404, "Submission not found")
    item.Marks=data.Marks; item.Feedback=data.Feedback; item.Status="graded"; item.GradedAt=datetime.utcnow()
    db.commit(); db.refresh(item); return item
