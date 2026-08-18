from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate


def create_job(data: JobCreate):
    db: Session = SessionLocal()

    job = Job(**data.dict())

    db.add(job)
    db.commit()
    db.refresh(job)

    db.close()

    return job


def get_jobs():
    db = SessionLocal()

    jobs = db.query(Job).all()

    db.close()

    return jobs


def get_job(job_id: int):
    db = SessionLocal()

    job = db.query(Job).filter(
        Job.JobID == job_id
    ).first()

    db.close()

    return job


def update_job(job_id: int, data: JobUpdate):
    db = SessionLocal()

    job = db.query(Job).filter(
        Job.JobID == job_id
    ).first()

    if not job:
        db.close()
        return {"message": "Job not found"}

    for key, value in data.dict().items():
        setattr(job, key, value)

    db.commit()
    db.refresh(job)

    db.close()

    return job


def delete_job(job_id: int):
    db = SessionLocal()

    job = db.query(Job).filter(
        Job.JobID == job_id
    ).first()

    if not job:
        db.close()
        return {"message": "Job not found"}

    db.delete(job)
    db.commit()

    db.close()

    return {"message": "Job deleted successfully"}