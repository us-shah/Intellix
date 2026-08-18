from dotenv import load_dotenv
import os

load_dotenv()


def _env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


# PostgreSQL / Neon connection string.
# Example:
# postgresql+psycopg://user:password@host/database?sslmode=require
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
RESET_TOKEN_EXPIRE_MINUTES = int(os.getenv("RESET_TOKEN_EXPIRE_MINUTES", "30"))

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").strip()
CORS_ORIGINS = [
    item.strip()
    for item in os.getenv("CORS_ORIGINS", "").split(",")
    if item.strip()
]
ALLOW_VERCEL_PREVIEWS = _env_bool("ALLOW_VERCEL_PREVIEWS", default=False)
DEBUG = _env_bool("DEBUG", default=True)
