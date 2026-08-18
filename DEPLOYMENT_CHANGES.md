# PostgreSQL Conversion Changes

- Replaced SQL Server/pyodbc runtime connection with PostgreSQL `DATABASE_URL`.
- Added PostgreSQL driver (`psycopg2-binary`).
- Removed Microsoft ODBC dependencies from the backend Docker image.
- Converted SQL Server-specific dashboard SQL to PostgreSQL syntax.
- Converted Deals and Leads services from raw SQL to SQLAlchemy ORM.
- Added a proper `Lead` SQLAlchemy model.
- Added `database/postgresql_schema.sql` and `database/postgresql_seed.sql`.
- Added `scripts/init_postgres.py` and `scripts/seed_postgres.py`.
- Added `scripts/migrate_sqlserver_to_postgres.py` to copy the existing local SQL Server data to Neon/PostgreSQL.
- Added migration-only requirements and environment template.
- Updated Render configuration for `DATABASE_URL`.
- Updated Docker Compose for a local PostgreSQL 16 database.
- Updated deployment documentation for Neon + Render + Vercel.
