from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user

from app.schemas.project import ProjectCreate, ProjectUpdate

from app.services.project_service import (
    create_project,
    get_projects,
    get_project,
    update_project,
    delete_project
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("/")
def add_project(
    project: ProjectCreate,
    current_user=Depends(get_current_user)
):
    return create_project(project)


@router.get("/")
def all_projects(
    current_user=Depends(get_current_user)
):
    return get_projects()


@router.get("/{project_id}")
def single_project(
    project_id: int,
    current_user=Depends(get_current_user)
):
    return get_project(project_id)


@router.put("/{project_id}")
def edit_project(
    project_id: int,
    project: ProjectUpdate,
    current_user=Depends(get_current_user)
):
    return update_project(project_id, project)


@router.delete("/{project_id}")
def remove_project(
    project_id: int,
    current_user=Depends(get_current_user)
):
    return delete_project(project_id)