from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


def create_task(db: Session, task: TaskCreate):
    new_task = Task(
        Title=task.Title,
        Description=task.Description,
        AssignedTo=task.AssignedTo,
        Priority=task.Priority,
        Status=task.Status,
        DueDate=task.DueDate
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


def get_tasks(db: Session):
    return db.query(Task).all()


def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.TaskID == task_id).first()


def update_task(db: Session, task_id: int, task: TaskUpdate):
    existing = db.query(Task).filter(Task.TaskID == task_id).first()

    if existing is None:
        return None

    existing.Title = task.Title
    existing.Description = task.Description
    existing.AssignedTo = task.AssignedTo
    existing.Priority = task.Priority
    existing.Status = task.Status
    existing.DueDate = task.DueDate

    db.commit()
    db.refresh(existing)

    return existing


def delete_task(db: Session, task_id: int):
    existing = db.query(Task).filter(Task.TaskID == task_id).first()

    if existing is None:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Task deleted successfully"}