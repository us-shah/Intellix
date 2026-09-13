"""Seed standard Intellix roles and permissions into PostgreSQL/Neon."""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "backend"
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

from app.core.database import SessionLocal
from app.models.permission import Permission
from app.models.role import Role
from app.models.role_permission import RolePermission

ROLES = {
    "SUPER_ADMIN": "Platform owner. Full unrestricted control.",
    "ADMIN": "Platform administrator. Operational administration without owner-only RBAC control.",
    "MANAGER": "General business manager.",
    "HR_MANAGER": "Human resources manager.",
    "HR": "Human resources staff.",
    "SALES_MANAGER": "Sales team manager.",
    "SALES": "Sales representative.",
    "PROJECT_MANAGER": "Project delivery manager.",
    "FINANCE": "Finance team.",
    "SUPPORT": "Support team.",
    "EMPLOYEE": "General company employee.",
    "INSTRUCTOR": "Academy instructor.",
    "STUDENT": "Academy student.",
    "CLIENT": "Company client.",
}

PERMISSIONS = [
    ("users.view", "View users"),
    ("users.manage", "Manage users"),
    ("roles.manage", "Manage roles and role assignments"),
    ("permissions.manage", "Manage permissions"),
    ("crm.view", "View CRM"),
    ("crm.manage", "Manage CRM"),
    ("lms.view", "View LMS administration"),
    ("lms.manage", "Manage LMS"),
    ("projects.view", "View projects"),
    ("projects.manage", "Manage projects"),
    ("finance.view", "View finance"),
    ("finance.manage", "Manage finance"),
    ("hr.view", "View HR"),
    ("hr.manage", "Manage HR"),
    ("support.view", "View support"),
    ("support.manage", "Manage support"),
    ("content.manage", "Manage website content"),
    ("ai.use", "Use AI assistant"),
    ("audit.view", "View activity logs"),
    ("settings.manage", "Manage platform settings"),
]

DEFAULT_ROLE_PERMISSIONS = {
    "ADMIN": ["users.view", "crm.view", "crm.manage", "lms.view", "lms.manage", "projects.view", "projects.manage", "hr.view", "finance.view", "support.view", "content.manage", "ai.use"],
    "MANAGER": ["crm.view", "crm.manage", "projects.view", "projects.manage", "ai.use"],
    "HR_MANAGER": ["users.view", "hr.view", "hr.manage", "ai.use"],
    "HR": ["hr.view", "hr.manage", "ai.use"],
    "SALES_MANAGER": ["crm.view", "crm.manage", "ai.use"],
    "SALES": ["crm.view", "crm.manage", "ai.use"],
    "PROJECT_MANAGER": ["projects.view", "projects.manage", "crm.view", "ai.use"],
    "FINANCE": ["finance.view", "finance.manage", "ai.use"],
    "SUPPORT": ["support.view", "support.manage", "ai.use"],
    "EMPLOYEE": ["ai.use"],
    "INSTRUCTOR": ["lms.view", "lms.manage", "ai.use"],
}


def main() -> None:
    db = SessionLocal()
    try:
        for name, description in ROLES.items():
            role = db.query(Role).filter(Role.RoleName == name).first()
            if role is None:
                db.add(Role(RoleName=name, Description=description))
        db.commit()

        for code, name in PERMISSIONS:
            permission = db.query(Permission).filter(Permission.Code == code).first()
            if permission is None:
                db.add(Permission(Code=code, Name=name, Description=name))
        db.commit()

        roles = {r.RoleName: r for r in db.query(Role).all()}
        permissions = {p.Code: p for p in db.query(Permission).all()}
        for role_name, codes in DEFAULT_ROLE_PERMISSIONS.items():
            role = roles.get(role_name)
            if not role:
                continue
            existing = {row.PermissionID for row in db.query(RolePermission).filter(RolePermission.RoleID == role.RoleID).all()}
            for code in codes:
                permission = permissions.get(code)
                if permission and permission.PermissionID not in existing:
                    db.add(RolePermission(RoleID=role.RoleID, PermissionID=permission.PermissionID))
        db.commit()
        print("Roles, permissions, and default role permissions seeded successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
