from fastapi import APIRouter, Depends

from app.schemas.lead import LeadCreate, LeadUpdate
from app.auth.dependencies import get_current_user

from app.services.lead_service import (
    create_lead,
    get_leads,
    get_lead,
    update_lead,
    delete_lead
)

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


@router.post("/")
def add_lead(
    lead: LeadCreate,
    current_user=Depends(get_current_user)
):
    return create_lead(lead)


@router.get("/")
def all_leads(
    current_user=Depends(get_current_user)
):
    return get_leads()


@router.get("/{lead_id}")
def single_lead(
    lead_id: int,
    current_user=Depends(get_current_user)
):
    return get_lead(lead_id)


@router.put("/{lead_id}")
def edit_lead(
    lead_id: int,
    lead: LeadUpdate,
    current_user=Depends(get_current_user)
):
    return update_lead(lead_id, lead)


@router.delete("/{lead_id}")
def remove_lead(
    lead_id: int,
    current_user=Depends(get_current_user)
):
    return delete_lead(lead_id)