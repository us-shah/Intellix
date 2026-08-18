"""Create or promote a PostgreSQL Intellix SUPER_ADMIN.

Usage from backend folder:
    python ../scripts/create_admin.py
"""
import getpass

from app.auth.password import hash_password
from app.core.database import SessionLocal
from app.models.role import Role
from app.models.user import User


def main() -> None:
    email = input("Admin email: ").strip().lower()
    full_name = input("Full name: ").strip() or "Intellix Admin"
    password = getpass.getpass("Password: ")

    if len(password) < 8:
        raise SystemExit("Password must be at least 8 characters.")

    db = SessionLocal()
    try:
        role = db.query(Role).filter(Role.RoleName == "SUPER_ADMIN").first()
        if role is None:
            role = Role(RoleName="SUPER_ADMIN", Description="Full platform control")
            db.add(role)
            db.flush()

        user = db.query(User).filter(User.Email == email).first()
        if user is None:
            user = User(
                FullName=full_name,
                Email=email,
                PasswordHash=hash_password(password),
                RoleID=role.RoleID,
                IsActive=True,
            )
            db.add(user)
        else:
            user.FullName = full_name or user.FullName
            user.PasswordHash = hash_password(password)
            user.RoleID = role.RoleID
            user.IsActive = True

        db.commit()
        print(f"SUPER_ADMIN ready: {email}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
