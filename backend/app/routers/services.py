from fastapi import APIRouter, Depends
from app.auth.dependencies import get_current_user

from app.schemas.service import ServiceCreate, ServiceUpdate
from app.services.service_service import (
    create_service,
    get_services,
    get_service,
    update_service,
    delete_service,
)

router = APIRouter(
    prefix="/services",
    tags=["Services"],
)


@router.post("/")
def add_service(
    service: ServiceCreate,
    current_user=Depends(get_current_user),
):
    return create_service(service)


@router.get("/")
def all_services(
    current_user=Depends(get_current_user),
):
    return get_services()


@router.get("/{service_id}")
def single_service(
    service_id: int,
    current_user=Depends(get_current_user),
):
    return get_service(service_id)


@router.put("/{service_id}")
def edit_service(
    service_id: int,
    service: ServiceUpdate,
    current_user=Depends(get_current_user),
):
    return update_service(service_id, service)


@router.delete("/{service_id}")
def remove_service(
    service_id: int,
    current_user=Depends(get_current_user),
):
    return delete_service(service_id)