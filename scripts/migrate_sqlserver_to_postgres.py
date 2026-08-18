"""Copy Intellix data from local SQL Server to PostgreSQL/Neon.

This script:
1. Connects to SQL Server using pyodbc.
2. Creates the PostgreSQL schema from the current SQLAlchemy models.
3. Copies rows table-by-table while preserving primary-key IDs.
4. Resets PostgreSQL sequences after the copy.

Run from the backend folder after installing scripts/requirements-migration.txt:
    python ../scripts/migrate_sqlserver_to_postgres.py
"""
from __future__ import annotations

import os
from pathlib import Path
from urllib.parse import quote_plus

from dotenv import load_dotenv
from sqlalchemy import MetaData, Table, create_engine, inspect, select, text

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / "backend" / ".env")
load_dotenv(ROOT / "scripts" / ".env.migration")


def env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def build_mssql_url() -> str:
    server = os.getenv("MSSQL_SERVER", "localhost")
    database = os.getenv("MSSQL_DATABASE", "intellixDB")
    driver = os.getenv("MSSQL_DRIVER", "ODBC Driver 18 for SQL Server")
    trusted = env_bool("MSSQL_TRUSTED_CONNECTION", True)
    trust_cert = env_bool("MSSQL_TRUST_SERVER_CERTIFICATE", True)

    parts = [
        f"DRIVER={{{driver}}}",
        f"SERVER={server}",
        f"DATABASE={database}",
    ]
    if trusted:
        parts.append("Trusted_Connection=yes")
    else:
        username = os.getenv("MSSQL_USERNAME", "")
        password = os.getenv("MSSQL_PASSWORD", "")
        if not username or not password:
            raise RuntimeError("MSSQL_USERNAME and MSSQL_PASSWORD are required when trusted connection is disabled.")
        parts.extend([f"UID={username}", f"PWD={password}"])
    parts.extend([
        "Encrypt=yes",
        f"TrustServerCertificate={'yes' if trust_cert else 'no'}",
    ])
    return "mssql+pyodbc:///?odbc_connect=" + quote_plus(";".join(parts) + ";")


def postgres_url() -> str:
    value = os.getenv("DATABASE_URL", "").strip()
    if not value:
        raise RuntimeError("DATABASE_URL is required for the PostgreSQL target.")
    if value.startswith("postgresql://"):
        value = "postgresql+psycopg2://" + value[len("postgresql://"):]
    return value


# Parent tables must be copied before child tables.

COLUMN_ALIASES = {
    "Leads": {"Name": "FullName"},
    "Deals": {"ExpectedCloseDate": "ExpectedDate"},
}

TABLE_ORDER = [
    "Roles",
    "Permissions",
    "Companies",
    "Users",
    "RolePermissions",
    "Customers",
    "Leads",
    "Deals",
    "Tasks",
    "Meetings",
    "Notes",
    "Notifications",
    "ActivityLogs",
    "Projects",
    "Contacts",
    "Services",
    "Newsletter",
    "Jobs",
    "Blogs",
    "Documents",
    "Settings",
    "Courses",
    "Lessons",
    "Enrollments",
    "Assignments",
    "Submissions",
    "ClientProfiles",
    "Organizations",
    "Departments",
    "Employees",
    "LeaveRequests",
    "Invoices",
    "Expenses",
    "SupportTickets",
    "KnowledgeDocuments",
    "KnowledgeChunks",
    "AIConversations",
    "AIMessages",
]


def main() -> None:
    source_engine = create_engine(build_mssql_url(), pool_pre_ping=True)
    target_engine = create_engine(postgres_url(), pool_pre_ping=True)

    # Import after target URL has already been validated. The model package registers all tables.
    os.environ["DATABASE_URL"] = postgres_url()
    from app.core.database import Base  # noqa: WPS433
    import app.models  # noqa: F401,WPS433

    Base.metadata.create_all(target_engine)

    source_inspector = inspect(source_engine)
    source_tables = set(source_inspector.get_table_names())
    target_tables = Base.metadata.tables

    truncate = env_bool("MIGRATION_TRUNCATE_TARGET", True)
    if truncate:
        existing_target_names = [name for name in TABLE_ORDER if name in target_tables]
        if existing_target_names:
            quoted = ", ".join(f'"{name}"' for name in reversed(existing_target_names))
            with target_engine.begin() as conn:
                conn.execute(text(f"TRUNCATE TABLE {quoted} RESTART IDENTITY CASCADE"))

    source_meta = MetaData()
    migrated = []

    for table_name in TABLE_ORDER:
        target_table = target_tables.get(table_name)
        if target_table is None:
            print(f"SKIP {table_name}: not present in target metadata")
            continue
        if table_name not in source_tables:
            print(f"SKIP {table_name}: not present in SQL Server source")
            continue

        source_table = Table(table_name, source_meta, autoload_with=source_engine)
        target_columns = {column.name for column in target_table.columns}
        aliases = COLUMN_ALIASES.get(table_name, {})
        selected = []
        target_names = []
        for source_column in source_table.columns:
            target_name = aliases.get(source_column.name, source_column.name)
            if target_name in target_columns and target_name not in target_names:
                selected.append(source_column.label(target_name))
                target_names.append(target_name)

        if not selected:
            print(f"SKIP {table_name}: no compatible columns")
            continue

        with source_engine.connect() as src:
            rows = src.execute(select(*selected)).mappings().all()

        if rows:
            payload = [{name: row[name] for name in target_names} for row in rows]
            with target_engine.begin() as dst:
                dst.execute(target_table.insert(), payload)

        print(f"COPIED {table_name}: {len(rows)} row(s)")
        migrated.append(table_name)

    # Reset serial sequences so future inserts continue after preserved SQL Server IDs.
    with target_engine.begin() as conn:
        for table_name in migrated:
            table = target_tables[table_name]
            pk_cols = list(table.primary_key.columns)
            if len(pk_cols) != 1:
                continue
            pk = pk_cols[0]
            if str(pk.type).upper() != "INTEGER":
                continue
            seq = conn.execute(
                text("SELECT pg_get_serial_sequence(:table_name, :column_name)"),
                {"table_name": f'\"{table_name}\"', "column_name": pk.name},
            ).scalar()
            if not seq:
                continue
            max_id = conn.execute(text(f'SELECT COALESCE(MAX("{pk.name}"), 0) FROM "{table_name}"')).scalar() or 0
            if max_id > 0:
                conn.execute(text("SELECT setval(:seq, :value, true)"), {"seq": seq, "value": int(max_id)})

    print("\nMigration complete.")
    print("Verify Users, Roles, Courses, Customers, KnowledgeDocuments and AI tables before deployment.")


if __name__ == "__main__":
    main()
