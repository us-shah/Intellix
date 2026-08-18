"""Seed standard Intellix roles and permissions into PostgreSQL/Neon."""
from app.core.database import SessionLocal
from app.models.permission import Permission
from app.models.role import Role

ROLES = {
    "SUPER_ADMIN": "Full platform control",
    "ADMIN": "Platform administrator",
    "MANAGER": "Business manager",
    "SALES": "Sales team",
    "INSTRUCTOR": "Academy instructor",
    "STUDENT": "Academy student",
    "CLIENT": "Company client",
    "HR": "Human resources",
    "FINANCE": "Finance team",
    "SUPPORT": "Support team",
    "EMPLOYEE": "Company employee",
}

PERMISSIONS = [
    ("users.manage", "Manage users"),
    ("roles.manage", "Manage roles"),
    ("crm.manage", "Manage CRM"),
    ("lms.manage", "Manage LMS"),
    ("projects.manage", "Manage projects"),
    ("finance.manage", "Manage finance"),
    ("hr.manage", "Manage HR"),
    ("ai.use", "Use AI assistant"),
]


def main() -> None:
    db = SessionLocal()
    try:
        for name, description in ROLES.items():
            role = db.query(Role).filter(Role.RoleName == name).first()
            if role is None:
                db.add(Role(RoleName=name, Description=description))

        for code, name in PERMISSIONS:
            permission = db.query(Permission).filter(Permission.Code == code).first()
            if permission is None:
                db.add(Permission(Code=code, Name=name, Description=name))

        db.commit()
        print("Roles and permissions seeded successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
