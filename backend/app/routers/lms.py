from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.dependencies.role_checker import RoleChecker
from app.models.assignment import Assignment
from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.lesson import Lesson
from app.models.lesson_progress import LessonProgress
from app.models.role import Role
from app.models.submission import Submission
from app.models.user import User
from app.schemas.lms import (
    AssignmentCreate,
    CourseCreate,
    CourseResponse,
    CourseUpdate,
    EnrollmentCreate,
    GradeSubmission,
    LessonCreate,
    LessonResponse,
    SubmissionCreate,
)

router = APIRouter(prefix="/lms", tags=["LMS"])
staff = RoleChecker(["SUPER_ADMIN", "ADMIN", "INSTRUCTOR"])
admin = RoleChecker(["SUPER_ADMIN", "ADMIN"])
student = RoleChecker(["STUDENT"])
student_or_staff = RoleChecker(["SUPER_ADMIN", "ADMIN", "INSTRUCTOR", "STUDENT"])


def _role(user: User) -> str:
    return (user.role.RoleName if user and user.role else "").upper()


def _course_allowed(db: Session, user: User, course: Course, *, write: bool = False) -> bool:
    role = _role(user)
    if role in {"SUPER_ADMIN", "ADMIN"}:
        return True
    if role == "INSTRUCTOR":
        return course.InstructorID in {None, user.UserID} if write else True
    if role == "STUDENT":
        return (
            db.query(Enrollment)
            .filter(Enrollment.StudentID == user.UserID, Enrollment.CourseID == course.CourseID)
            .first()
            is not None
        )
    return False


def _course_dict(course: Course) -> dict:
    return {
        "CourseID": course.CourseID,
        "Title": course.Title,
        "Slug": course.Slug,
        "ShortDescription": course.ShortDescription,
        "Description": course.Description,
        "Thumbnail": course.Thumbnail,
        "Price": float(course.Price or 0),
        "Level": course.Level,
        "Status": course.Status,
        "InstructorID": course.InstructorID,
        "IsPublished": bool(course.IsPublished),
        "CreatedAt": course.CreatedAt,
        "UpdatedAt": course.UpdatedAt,
    }


@router.get("/catalog")
def public_catalog(db: Session = Depends(get_db)):
    rows = db.query(Course).filter(Course.IsPublished.is_(True), Course.Status != "archived").order_by(Course.CreatedAt.desc()).all()
    return [_course_dict(x) for x in rows]


@router.get("/catalog/{slug}")
def public_course(slug: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.Slug == slug, Course.IsPublished.is_(True), Course.Status != "archived").first()
    if not course:
        raise HTTPException(404, "Course not found")
    lessons = db.query(Lesson).filter(Lesson.CourseID == course.CourseID, Lesson.IsPreview.is_(True)).order_by(Lesson.SortOrder, Lesson.LessonID).all()
    return {**_course_dict(course), "preview_lessons": [{"LessonID": x.LessonID, "Title": x.Title, "Content": x.Content, "VideoURL": x.VideoURL, "ResourceURL": x.ResourceURL, "SortOrder": x.SortOrder, "IsPreview": x.IsPreview} for x in lessons]}


@router.get("/courses", response_model=list[CourseResponse])
def courses(db: Session = Depends(get_db), user=Depends(student_or_staff)):
    query = db.query(Course)
    role = _role(user)
    if role == "STUDENT":
        enrolled_ids = db.query(Enrollment.CourseID).filter(Enrollment.StudentID == user.UserID)
        query = query.filter(Course.CourseID.in_(enrolled_ids), Course.IsPublished.is_(True))
    elif role == "INSTRUCTOR":
        query = query.filter((Course.InstructorID == user.UserID) | (Course.InstructorID.is_(None)))
    return query.order_by(Course.CreatedAt.desc()).all()


@router.get("/courses/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db), user=Depends(student_or_staff)):
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(404, "Course not found")
    if not _course_allowed(db, user, course):
        raise HTTPException(403, "You do not have access to this course")
    if _role(user) == "STUDENT" and not course.IsPublished:
        raise HTTPException(404, "Course not found")
    return _course_dict(course)


@router.post("/courses", response_model=CourseResponse)
def create_course(data: CourseCreate, db: Session = Depends(get_db), user=Depends(staff)):
    if db.query(Course).filter(Course.Slug == data.Slug).first():
        raise HTTPException(400, "Course slug already exists")
    body = data.model_dump()
    if _role(user) == "INSTRUCTOR":
        body["InstructorID"] = user.UserID
    item = Course(**body)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/courses/{course_id}", response_model=CourseResponse)
def update_course(course_id: int, data: CourseUpdate, db: Session = Depends(get_db), user=Depends(staff)):
    item = db.get(Course, course_id)
    if not item:
        raise HTTPException(404, "Course not found")
    if not _course_allowed(db, user, item, write=True):
        raise HTTPException(403, "You cannot edit this course")
    changes = data.model_dump(exclude_unset=True)
    if "Slug" in changes:
        duplicate = db.query(Course).filter(Course.Slug == changes["Slug"], Course.CourseID != course_id).first()
        if duplicate:
            raise HTTPException(400, "Course slug already exists")
    if _role(user) == "INSTRUCTOR":
        changes["InstructorID"] = user.UserID
    for key, value in changes.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db), _=Depends(admin)):
    item = db.get(Course, course_id)
    if not item:
        raise HTTPException(404, "Course not found")
    db.delete(item)
    db.commit()
    return {"message": "Course deleted"}


@router.post("/courses/{course_id}/lessons", response_model=LessonResponse)
def add_lesson(course_id: int, data: LessonCreate, db: Session = Depends(get_db), user=Depends(staff)):
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(404, "Course not found")
    if not _course_allowed(db, user, course, write=True):
        raise HTTPException(403, "You cannot manage this course")
    item = Lesson(CourseID=course_id, **data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/lessons/{lesson_id}", response_model=LessonResponse)
def update_lesson(lesson_id: int, data: LessonCreate, db: Session = Depends(get_db), user=Depends(staff)):
    item = db.get(Lesson, lesson_id)
    if not item:
        raise HTTPException(404, "Lesson not found")
    course = db.get(Course, item.CourseID)
    if not course or not _course_allowed(db, user, course, write=True):
        raise HTTPException(403, "You cannot manage this lesson")
    for key, value in data.model_dump().items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/lessons/{lesson_id}")
def delete_lesson(lesson_id: int, db: Session = Depends(get_db), user=Depends(staff)):
    item = db.get(Lesson, lesson_id)
    if not item:
        raise HTTPException(404, "Lesson not found")
    course = db.get(Course, item.CourseID)
    if not course or not _course_allowed(db, user, course, write=True):
        raise HTTPException(403, "You cannot manage this lesson")
    db.delete(item)
    db.commit()
    return {"message": "Lesson deleted"}


@router.get("/courses/{course_id}/lessons", response_model=list[LessonResponse])
def lessons(course_id: int, db: Session = Depends(get_db), user=Depends(student_or_staff)):
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(404, "Course not found")
    if not _course_allowed(db, user, course):
        raise HTTPException(403, "You do not have access to this course")
    return db.query(Lesson).filter(Lesson.CourseID == course_id).order_by(Lesson.SortOrder, Lesson.LessonID).all()


@router.get("/enrollments")
def list_enrollments(db: Session = Depends(get_db), user=Depends(staff)):
    query = db.query(Enrollment).options(joinedload(Enrollment.course))
    if _role(user) == "INSTRUCTOR":
        query = query.join(Course, Course.CourseID == Enrollment.CourseID).filter(Course.InstructorID == user.UserID)
    rows = query.order_by(Enrollment.EnrolledAt.desc()).all()
    users = {u.UserID: u for u in db.query(User).filter(User.UserID.in_([r.StudentID for r in rows] or [0])).all()}
    return [
        {
            "EnrollmentID": r.EnrollmentID,
            "StudentID": r.StudentID,
            "CourseID": r.CourseID,
            "Status": r.Status,
            "ProgressPercent": float(r.ProgressPercent or 0),
            "EnrolledAt": r.EnrolledAt,
            "student": ({"UserID": users[r.StudentID].UserID, "FullName": users[r.StudentID].FullName, "Email": users[r.StudentID].Email} if r.StudentID in users else None),
            "course": _course_dict(r.course) if r.course else None,
        }
        for r in rows
    ]


@router.post("/enrollments")
def enroll(data: EnrollmentCreate, db: Session = Depends(get_db), user=Depends(staff)):
    course = db.get(Course, data.CourseID)
    learner = db.get(User, data.StudentID)
    if not course:
        raise HTTPException(404, "Course not found")
    if not learner:
        raise HTTPException(404, "Student not found")
    learner_role = (learner.role.RoleName if learner.role else "").upper()
    if learner_role != "STUDENT":
        raise HTTPException(400, "Selected user is not a STUDENT")
    if _role(user) == "INSTRUCTOR" and course.InstructorID != user.UserID:
        raise HTTPException(403, "You can only enroll students in your courses")
    existing = db.query(Enrollment).filter(Enrollment.StudentID == data.StudentID, Enrollment.CourseID == data.CourseID).first()
    if existing:
        raise HTTPException(400, "Student already enrolled")
    item = Enrollment(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"EnrollmentID": item.EnrollmentID, "StudentID": item.StudentID, "CourseID": item.CourseID, "Status": item.Status, "ProgressPercent": float(item.ProgressPercent or 0)}


@router.get("/my-courses")
def my_courses(db: Session = Depends(get_db), user=Depends(student)):
    rows = db.query(Enrollment).options(joinedload(Enrollment.course)).filter(Enrollment.StudentID == user.UserID).order_by(Enrollment.EnrolledAt.desc()).all()
    return [
        {"enrollment_id": r.EnrollmentID, "status": r.Status, "progress": float(r.ProgressPercent or 0), "course": _course_dict(r.course)}
        for r in rows if r.course
    ]


@router.get("/courses/{course_id}/progress")
def course_progress(course_id: int, db: Session = Depends(get_db), user=Depends(student)):
    enrollment = db.query(Enrollment).filter(Enrollment.StudentID == user.UserID, Enrollment.CourseID == course_id).first()
    if not enrollment:
        raise HTTPException(403, "You are not enrolled in this course")
    completed = db.query(LessonProgress).filter(LessonProgress.EnrollmentID == enrollment.EnrollmentID, LessonProgress.IsCompleted.is_(True)).all()
    return {"progress": float(enrollment.ProgressPercent or 0), "completed_lesson_ids": [x.LessonID for x in completed]}


@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: int, db: Session = Depends(get_db), user=Depends(student)):
    lesson = db.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(404, "Lesson not found")
    enrollment = db.query(Enrollment).filter(Enrollment.StudentID == user.UserID, Enrollment.CourseID == lesson.CourseID).first()
    if not enrollment:
        raise HTTPException(403, "You are not enrolled in this course")
    row = db.query(LessonProgress).filter(LessonProgress.EnrollmentID == enrollment.EnrollmentID, LessonProgress.LessonID == lesson_id).first()
    if not row:
        db.add(LessonProgress(EnrollmentID=enrollment.EnrollmentID, LessonID=lesson_id, IsCompleted=True))
    else:
        row.IsCompleted = True
        row.CompletedAt = datetime.utcnow()
    db.flush()
    total = db.query(Lesson).filter(Lesson.CourseID == lesson.CourseID).count()
    done = db.query(LessonProgress).join(Lesson, Lesson.LessonID == LessonProgress.LessonID).filter(LessonProgress.EnrollmentID == enrollment.EnrollmentID, LessonProgress.IsCompleted.is_(True), Lesson.CourseID == lesson.CourseID).count()
    percent = round((done / total) * 100, 2) if total else 0
    enrollment.ProgressPercent = percent
    if total and done >= total:
        enrollment.Status = "completed"
        enrollment.CompletedAt = datetime.utcnow()
    db.commit()
    return {"progress": percent, "completed_lesson_id": lesson_id}


@router.get("/assignments")
def list_assignments(course_id: int | None = None, db: Session = Depends(get_db), user=Depends(staff)):
    query = db.query(Assignment).options(joinedload(Assignment.course))
    if course_id:
        query = query.filter(Assignment.CourseID == course_id)
    if _role(user) == "INSTRUCTOR":
        query = query.join(Course, Course.CourseID == Assignment.CourseID).filter(Course.InstructorID == user.UserID)
    rows = query.order_by(Assignment.CreatedAt.desc()).all()
    return [{"AssignmentID": a.AssignmentID, "CourseID": a.CourseID, "Title": a.Title, "Instructions": a.Instructions, "DueAt": a.DueAt, "MaxMarks": float(a.MaxMarks or 100), "CreatedAt": a.CreatedAt, "course": _course_dict(a.course) if a.course else None} for a in rows]


@router.get("/my-assignments")
def my_assignments(db: Session = Depends(get_db), user=Depends(student)):
    course_ids = [x[0] for x in db.query(Enrollment.CourseID).filter(Enrollment.StudentID == user.UserID, Enrollment.Status.in_(["active", "completed"])).all()]
    if not course_ids:
        return []
    rows = db.query(Assignment).options(joinedload(Assignment.course)).filter(Assignment.CourseID.in_(course_ids)).order_by(Assignment.DueAt.asc().nullslast(), Assignment.CreatedAt.desc()).all()
    return [{"AssignmentID": a.AssignmentID, "CourseID": a.CourseID, "Title": a.Title, "Instructions": a.Instructions, "DueAt": a.DueAt, "MaxMarks": float(a.MaxMarks or 100), "CreatedAt": a.CreatedAt, "course": _course_dict(a.course) if a.course else None} for a in rows]


@router.post("/assignments")
def create_assignment(data: AssignmentCreate, db: Session = Depends(get_db), user=Depends(staff)):
    course = db.get(Course, data.CourseID)
    if not course:
        raise HTTPException(404, "Course not found")
    if not _course_allowed(db, user, course, write=True):
        raise HTTPException(403, "You cannot manage assignments for this course")
    item = Assignment(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/submissions")
def list_submissions(db: Session = Depends(get_db), user=Depends(staff)):
    query = db.query(Submission).options(joinedload(Submission.assignment).joinedload(Assignment.course))
    if _role(user) == "INSTRUCTOR":
        query = query.join(Assignment, Assignment.AssignmentID == Submission.AssignmentID).join(Course, Course.CourseID == Assignment.CourseID).filter(Course.InstructorID == user.UserID)
    rows = query.order_by(Submission.SubmittedAt.desc()).all()
    user_map = {u.UserID: u for u in db.query(User).filter(User.UserID.in_([r.StudentID for r in rows] or [0])).all()}
    return [_submission_dict(r, user_map.get(r.StudentID)) for r in rows]


def _submission_dict(item: Submission, learner: User | None = None) -> dict:
    assignment = item.assignment
    return {
        "SubmissionID": item.SubmissionID,
        "AssignmentID": item.AssignmentID,
        "StudentID": item.StudentID,
        "AnswerText": item.AnswerText,
        "AttachmentURL": item.AttachmentURL,
        "Marks": float(item.Marks) if item.Marks is not None else None,
        "Feedback": item.Feedback,
        "Status": item.Status,
        "SubmittedAt": item.SubmittedAt,
        "GradedAt": item.GradedAt,
        "student": ({"UserID": learner.UserID, "FullName": learner.FullName, "Email": learner.Email} if learner else None),
        "assignment": ({"AssignmentID": assignment.AssignmentID, "CourseID": assignment.CourseID, "Title": assignment.Title, "Instructions": assignment.Instructions, "DueAt": assignment.DueAt, "MaxMarks": float(assignment.MaxMarks or 100), "CreatedAt": assignment.CreatedAt, "course": _course_dict(assignment.course) if assignment.course else None} if assignment else None),
    }


@router.get("/my-submissions")
def my_submissions(db: Session = Depends(get_db), user=Depends(student)):
    rows = db.query(Submission).options(joinedload(Submission.assignment).joinedload(Assignment.course)).filter(Submission.StudentID == user.UserID).order_by(Submission.SubmittedAt.desc()).all()
    return [_submission_dict(r, user) for r in rows]


@router.post("/assignments/{assignment_id}/submit")
def submit(assignment_id: int, data: SubmissionCreate, db: Session = Depends(get_db), user=Depends(student)):
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(404, "Assignment not found")
    enrollment = db.query(Enrollment).filter(Enrollment.StudentID == user.UserID, Enrollment.CourseID == assignment.CourseID).first()
    if not enrollment:
        raise HTTPException(403, "You are not enrolled in this course")
    existing = db.query(Submission).filter(Submission.AssignmentID == assignment_id, Submission.StudentID == user.UserID).first()
    if existing:
        existing.AnswerText = data.AnswerText
        existing.AttachmentURL = data.AttachmentURL
        existing.SubmittedAt = datetime.utcnow()
        existing.Status = "submitted"
        existing.Marks = None
        existing.Feedback = None
        existing.GradedAt = None
        item = existing
    else:
        item = Submission(AssignmentID=assignment_id, StudentID=user.UserID, **data.model_dump())
        db.add(item)
    db.commit()
    db.refresh(item)
    return _submission_dict(item, user)


@router.put("/submissions/{submission_id}/grade")
def grade(submission_id: int, data: GradeSubmission, db: Session = Depends(get_db), user=Depends(staff)):
    item = db.query(Submission).options(joinedload(Submission.assignment)).filter(Submission.SubmissionID == submission_id).first()
    if not item:
        raise HTTPException(404, "Submission not found")
    course = db.get(Course, item.assignment.CourseID) if item.assignment else None
    if not course or not _course_allowed(db, user, course, write=True):
        raise HTTPException(403, "You cannot grade this submission")
    if data.Marks < 0 or data.Marks > (item.assignment.MaxMarks or 100):
        raise HTTPException(400, "Marks must be between 0 and the assignment maximum")
    item.Marks = data.Marks
    item.Feedback = data.Feedback
    item.Status = "graded"
    item.GradedAt = datetime.utcnow()
    db.commit()
    db.refresh(item)
    learner = db.get(User, item.StudentID)
    return _submission_dict(item, learner)
