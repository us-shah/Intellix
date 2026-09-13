from sqlalchemy.orm import Session

from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate, MeetingUpdate


def create_meeting(db: Session, meeting: MeetingCreate):
    new_meeting = Meeting(
        CustomerID=meeting.CustomerID,
        Title=meeting.Title,
        MeetingDate=meeting.MeetingDate,
        Location=meeting.Location,
        Description=meeting.Description,
        CreatedBy=meeting.CreatedBy
    )

    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting)

    return new_meeting


def get_meetings(db: Session):
    return db.query(Meeting).all()


def get_meeting(db: Session, meeting_id: int):
    return db.query(Meeting).filter(Meeting.MeetingID == meeting_id).first()


def update_meeting(db: Session, meeting_id: int, meeting: MeetingUpdate):
    existing = db.query(Meeting).filter(Meeting.MeetingID == meeting_id).first()

    if not existing:
        return None

    existing.CustomerID = meeting.CustomerID
    existing.Title = meeting.Title
    existing.MeetingDate = meeting.MeetingDate
    existing.Location = meeting.Location
    existing.Description = meeting.Description
    existing.CreatedBy = meeting.CreatedBy

    db.commit()
    db.refresh(existing)

    return existing


def delete_meeting(db: Session, meeting_id: int):
    existing = db.query(Meeting).filter(Meeting.MeetingID == meeting_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Meeting deleted successfully"}