import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import ALLOW_VERCEL_PREVIEWS, CORS_ORIGINS, FRONTEND_URL
from app.core.database import engine

from app.routers.activity_log import router as activity_log_router
from app.routers.ai import router as ai_router
from app.routers.auth import router as auth_router
from app.routers.blog import router as blog_router
from app.routers.company import router as company_router
from app.routers.contact import router as contact_router
from app.routers.customer import router as customer_router
from app.routers.dashboard import router as dashboard_router
from app.routers.deal import router as deal_router
from app.routers.document import router as document_router
from app.routers.enterprise import router as enterprise_router
from app.routers.job import router as job_router
from app.routers.lead import router as lead_router
from app.routers.lms import router as lms_router
from app.routers.meetings import router as meeting_router
from app.routers.newsletter import router as newsletter_router
from app.routers.note import router as note_router
from app.routers.notification import router as notification_router
from app.routers.permissions import router as permissions_router
from app.routers.portal import router as portal_router
from app.routers.projects import router as project_router
from app.routers.role import router as role_router
from app.routers.services import router as service_router
from app.routers.setting import router as setting_router
from app.routers.task import router as task_router
from app.routers.user import router as user_router

app = FastAPI(
    title="Intellix Enterprise API",
    version="2.0.0",
)

origins = {
    "http://localhost:3000",
    "http://127.0.0.1:3000",
}
if FRONTEND_URL:
    origins.add(FRONTEND_URL.rstrip("/"))
origins.update(origin.rstrip("/") for origin in CORS_ORIGINS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=sorted(origins),
    allow_origin_regex=(r"https://.*\.vercel\.app" if ALLOW_VERCEL_PREVIEWS else None),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(customer_router)
app.include_router(lead_router)
app.include_router(deal_router)
app.include_router(task_router)
app.include_router(meeting_router)
app.include_router(note_router)
app.include_router(company_router)
app.include_router(user_router)
app.include_router(role_router)
app.include_router(notification_router)
app.include_router(activity_log_router)
app.include_router(dashboard_router)
app.include_router(project_router)
app.include_router(contact_router)
app.include_router(service_router)
app.include_router(newsletter_router)
app.include_router(job_router)
app.include_router(blog_router)
app.include_router(document_router)
app.include_router(setting_router)
app.include_router(permissions_router)
app.include_router(lms_router)
app.include_router(portal_router)
app.include_router(enterprise_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "name": "Intellix Enterprise API",
        "status": "online",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Database unavailable") from exc


@app.get("/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {
            "status": "success",
            "message": "Connected to PostgreSQL successfully!",
        }
    except Exception as exc:
        return {
            "status": "failed",
            "error": str(exc) if os.getenv("DEBUG", "false").lower() == "true" else "Database connection failed",
        }
