from fastapi import APIRouter, Depends

from app.schemas.deal import DealCreate, DealUpdate
from app.auth.dependencies import get_current_user
from app.dependencies.permission_checker import require_permission

from app.services.deal_service import (
    create_deal,
    get_deals,
    get_deal,
    update_deal,
    delete_deal
)

router = APIRouter(
    prefix="/deals",
    tags=["Deals"]
)


@router.post("/")
def add_deal(
    deal: DealCreate,
    current_user=Depends(require_permission("crm.manage"))
):
    return create_deal(deal)


@router.get("/")
def all_deals(
    current_user=Depends(require_permission("crm.manage"))
):
    return get_deals()


@router.get("/{deal_id}")
def single_deal(
    deal_id: int,
    current_user=Depends(require_permission("crm.manage"))
):
    return get_deal(deal_id)


@router.put("/{deal_id}")
def edit_deal(
    deal_id: int,
    deal: DealUpdate,
    current_user=Depends(require_permission("crm.manage"))
):
    return update_deal(deal_id, deal)


@router.delete("/{deal_id}")
def remove_deal(
    deal_id: int,
    current_user=Depends(require_permission("crm.manage"))
):
    return delete_deal(deal_id)