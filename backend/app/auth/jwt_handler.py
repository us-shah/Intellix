from datetime import datetime, timedelta, timezone
from typing import Any
from jose import jwt, JWTError

from app.core.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    RESET_TOKEN_EXPIRE_MINUTES,
)


def _encode(data: dict[str, Any], expires_minutes: int, token_type: str) -> str:
    payload = data.copy()
    payload.update({
        "type": token_type,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_minutes),
        "iat": datetime.now(timezone.utc),
    })
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(data: dict[str, Any]) -> str:
    return _encode(data, ACCESS_TOKEN_EXPIRE_MINUTES, "access")


def create_password_reset_token(email: str, user_id: int) -> str:
    return _encode(
        {"sub": email, "user_id": user_id},
        RESET_TOKEN_EXPIRE_MINUTES,
        "password_reset",
    )


def decode_password_reset_token(token: str) -> dict[str, Any] | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "password_reset":
            return None
        return payload
    except JWTError:
        return None
