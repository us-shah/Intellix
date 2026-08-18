from fastapi import APIRouter, Depends, HTTPException

from app.auth.dependencies import get_current_user

from app.schemas.setting import (
    SettingCreate,
    SettingUpdate
)

from app.services.setting_service import (
    create_setting,
    get_settings,
    get_setting,
    update_setting,
    delete_setting
)

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


@router.post("/")
def add_setting(
    setting: SettingCreate,
    current_user=Depends(get_current_user)
):
    return create_setting(setting)


@router.get("/")
def all_settings(
    current_user=Depends(get_current_user)
):
    return get_settings()


@router.get("/{setting_id}")
def single_setting(
    setting_id: int,
    current_user=Depends(get_current_user)
):
    setting = get_setting(setting_id)

    if not setting:
        raise HTTPException(
            status_code=404,
            detail="Setting not found"
        )

    return setting


@router.put("/{setting_id}")
def edit_setting(
    setting_id: int,
    setting: SettingUpdate,
    current_user=Depends(get_current_user)
):
    return update_setting(setting_id, setting)


@router.delete("/{setting_id}")
def remove_setting(
    setting_id: int,
    current_user=Depends(get_current_user)
):
    return delete_setting(setting_id)