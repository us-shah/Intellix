from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def create_project(data: ProjectCreate):
    db: Session = SessionLocal()

    project = Project(**data.dict())

    db.add(project)
    db.commit()
    db.refresh(project)

    db.close()

    return project


def get_projects():
    db = SessionLocal()

    projects = db.query(Project).all()

    db.close()

    return projects


def get_project(project_id: int):
    db = SessionLocal()

    project = db.query(Project).filter(
        Project.ProjectID == project_id
    ).first()

    db.close()

    return project


def update_project(project_id: int, data: ProjectUpdate):
    db = SessionLocal()

    project = db.query(Project).filter(
        Project.ProjectID == project_id
    ).first()

    if not project:
        db.close()
        return {"message": "Project not found"}

    for key, value in data.dict().items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)

    db.close()

    return project


def delete_project(project_id: int):
    db = SessionLocal()

    project = db.query(Project).filter(
        Project.ProjectID == project_id
    ).first()

    if not project:
        db.close()
        return {"message": "Project not found"}

    db.delete(project)
    db.commit()

    db.close()

    return {"message": "Project deleted successfully"}