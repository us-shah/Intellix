"""Create all Intellix tables in PostgreSQL/Neon using SQLAlchemy metadata.

Usage from backend folder:
    python ../scripts/init_postgres.py

Requires DATABASE_URL in the environment or backend/.env.
"""
from app.core.database import Base, engine
import app.models  # noqa: F401 - registers all models with Base.metadata


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Intellix PostgreSQL schema created/verified successfully.")


if __name__ == "__main__":
    main()
