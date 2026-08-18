from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user

from app.schemas.job import JobCreate, JobUpdate

from app.services.job_service import (
    create_job,
    get_jobs,
    get_job,
    update_job,
    delete_job
)

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/")
def add_job(
    job: JobCreate,
    current_user=Depends(get_current_user)
):
    return create_job(job)


@router.get("/")
def all_jobs(
    current_user=Depends(get_current_user)
):
    return get_jobs()


@router.get("/{job_id}")
def single_job(
    job_id: int,
    current_user=Depends(get_current_user)
):
    return get_job(job_id)


@router.put("/{job_id}")
def edit_job(
    job_id: int,
    job: JobUpdate,
    current_user=Depends(get_current_user)
):
    return update_job(job_id, job)


@router.delete("/{job_id}")
def remove_job(
    job_id: int,
    current_user=Depends(get_current_user)
):
    return delete_job(job_id)