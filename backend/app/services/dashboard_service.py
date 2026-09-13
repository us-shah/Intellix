from __future__ import annotations

from datetime import datetime, timedelta
from decimal import Decimal
from typing import Any

from sqlalchemy import func, text
from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog
from app.models.client_profile import ClientProfile
from app.models.company import Company
from app.models.course import Course
from app.models.customer import Customer
from app.models.deal import Deal
from app.models.enrollment import Enrollment
from app.models.meeting import Meeting
from app.models.project import Project
from app.models.task import Task
from app.models.user import User


def _safe_scalar(db: Session, sql: str, default: int | float = 0) -> int | float:
    try:
        value = db.execute(text(sql)).scalar()
        return default if value is None else value
    except Exception:
        db.rollback()
        return default


def _number(value: Any) -> float:
    if isinstance(value, Decimal):
        return float(value)
    return float(value or 0)


def get_dashboard_stats(db: Session) -> dict[str, Any]:
    now = datetime.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow = today_start + timedelta(days=1)
    next_week = today_start + timedelta(days=7)

    total_revenue = (
        db.query(func.coalesce(func.sum(Deal.Amount), 0))
        .filter(func.lower(func.coalesce(Deal.Stage, "")) == "won")
        .scalar()
    )

    pipeline_value = db.query(func.coalesce(func.sum(Deal.Amount), 0)).scalar()

    monthly_rows = db.execute(
        text(
            """
            SELECT
                to_char("CreatedAt", 'YYYY-MM') AS month_key,
                SUM(CASE WHEN lower(coalesce("Stage", '')) = 'won' THEN coalesce("Amount", 0) ELSE 0 END) AS revenue
            FROM "Deals"
            WHERE "CreatedAt" >= date_trunc('month', CURRENT_DATE) - interval '5 months'
            GROUP BY to_char("CreatedAt", 'YYYY-MM')
            ORDER BY month_key
            LIMIT 6
            """
        )
    ).mappings().all()

    deal_stage_rows = db.execute(
        text(
            """
            SELECT coalesce("Stage", 'Unspecified') AS stage, COUNT(*) AS total
            FROM "Deals"
            GROUP BY coalesce("Stage", 'Unspecified')
            ORDER BY total DESC
            """
        )
    ).mappings().all()

    recent_activities = (
        db.query(ActivityLog)
        .order_by(ActivityLog.ActionTime.desc())
        .limit(8)
        .all()
    )

    upcoming_tasks = (
        db.query(Task)
        .filter(Task.DueDate >= today_start, Task.DueDate < next_week)
        .order_by(Task.DueDate.asc())
        .limit(6)
        .all()
    )

    upcoming_meetings = (
        db.query(Meeting)
        .filter(Meeting.MeetingDate >= today_start, Meeting.MeetingDate < next_week)
        .order_by(Meeting.MeetingDate.asc())
        .limit(6)
        .all()
    )

    recent_deals = (
    db.query(
        Deal.DealID,
        Deal.Title,
        Deal.Amount,
        Deal.Stage,
        Deal.CustomerID,
        Deal.AssignedTo,
        Deal.CreatedAt,
    )
    .order_by(Deal.CreatedAt.desc())
    .limit(6)
    .all()
)

    return {
        "generated_at": now.isoformat(),
        "stats": {
    "customers": db.query(Customer).count(),
    "leads": int(_safe_scalar(db, 'SELECT COUNT(*) FROM "Leads"')),
    "deals": int(_safe_scalar(db, 'SELECT COUNT(*) FROM "Deals"')),
    "revenue": _number(total_revenue),
    "pipeline_value": _number(pipeline_value),
    "projects": db.query(Project).count(),
    "companies": db.query(Company).count(),
    "users": db.query(User).count(),
    "students": db.query(Enrollment.StudentID).distinct().count(),
    "courses": db.query(Course).count(),
    "clients": db.query(ClientProfile).count(),
    "tasks_due_today": (
        db.query(Task)
        .filter(
            Task.DueDate >= today_start,
            Task.DueDate < tomorrow,
        )
        .count()
    ),
    "meetings_today": (
        db.query(Meeting)
        .filter(
            Meeting.MeetingDate >= today_start,
            Meeting.MeetingDate < tomorrow,
        )
        .count()
    ),
},
        "monthly_revenue": [
            {"month": row["month_key"], "revenue": _number(row["revenue"])}
            for row in monthly_rows
        ],
        "deal_stages": [
            {"stage": row["stage"], "total": int(row["total"])}
            for row in deal_stage_rows
        ],
        "recent_activities": [
            {
                "id": item.ActivityID,
                "action": item.Action,
                "table": item.TableName,
                "record_id": item.RecordID,
                "user_id": item.UserID,
                "time": item.ActionTime.isoformat() if item.ActionTime else None,
            }
            for item in recent_activities
        ],
        "upcoming_tasks": [
            {
                "id": item.TaskID,
                "title": item.Title,
                "priority": item.Priority,
                "status": item.Status,
                "due_date": item.DueDate.isoformat() if item.DueDate else None,
            }
            for item in upcoming_tasks
        ],
        "upcoming_meetings": [
            {
                "id": item.MeetingID,
                "title": item.Title,
                "location": item.Location,
                "meeting_date": item.MeetingDate.isoformat() if item.MeetingDate else None,
            }
            for item in upcoming_meetings
        ],
        "recent_deals": [
    {
        "id": item.DealID,
        "title": item.Title,
        "amount": _number(item.Amount),
        "stage": item.Stage,
        "customer_id": item.CustomerID,
        "assigned_to": item.AssignedTo,
        "created_at": (
            item.CreatedAt.isoformat()
            if item.CreatedAt
            else None
        ),
    }
    for item in recent_deals
],
    }
