# Intellix — SQL Server to PostgreSQL / Neon

This release is converted to PostgreSQL for the application runtime. SQL Server ODBC is no longer required by the deployed backend.

## 1. Create a free Neon database

Create a Neon project and copy its connection string. Use it as `DATABASE_URL` in `backend/.env`.

Example:

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST/DB?sslmode=require
```

If Neon gives a URL beginning with `postgresql://`, it can also be used directly by SQLAlchemy with the installed psycopg2 driver. The explicit `postgresql+psycopg2://` form is recommended in this project.

## 2. Create the PostgreSQL schema

From the backend folder:

```powershell
pip install -r requirements.txt
python ../scripts/init_postgres.py
```

Or run `database/postgresql_schema.sql` in Neon SQL Editor.

## 3. Move your existing SQL Server data to Neon

The project contains a migration utility that reads your local `intellixDB` and copies data into PostgreSQL while preserving IDs.

Install the temporary migration dependencies:

```powershell
pip install -r ..\scripts\requirements-migration.txt
```

Copy:

```text
scripts/.env.migration.example
```

to:

```text
scripts/.env.migration
```

For your current Windows SQL Server setup, use:

```env
MSSQL_SERVER=localhost
MSSQL_DATABASE=intellixDB
MSSQL_DRIVER=ODBC Driver 18 for SQL Server
MSSQL_TRUSTED_CONNECTION=yes
MSSQL_TRUST_SERVER_CERTIFICATE=yes
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST/DB?sslmode=require
MIGRATION_TRUNCATE_TARGET=true
```

Then, from `backend`:

```powershell
python ..\scripts\migrate_sqlserver_to_postgres.py
```

The script copies only columns that exist in both the old SQL Server table and the new PostgreSQL model, so optional schema differences such as a missing old `ExpectedDate` column do not block the entire migration.

## 4. Verify PostgreSQL

Start FastAPI with the Neon `DATABASE_URL` and test:

```text
GET /health
POST /auth/login
GET /portal/me
GET /dashboard/stats
GET /lms/courses
GET /ai/knowledge
POST /ai/chat
```

## 5. Fresh database instead of migration

If you do not need your old data, run:

```powershell
python ../scripts/init_postgres.py
python ../scripts/seed_postgres.py
python ../scripts/create_admin.py
```

## 6. Render

Set these backend environment variables:

```env
DATABASE_URL=YOUR_NEON_CONNECTION_STRING
SECRET_KEY=YOUR_RANDOM_SECRET
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
RESET_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=https://YOUR-VERCEL-PROJECT.vercel.app
DEBUG=false
LLM_API_KEY=YOUR_KEY_IF_USED
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

No `DB_SERVER`, `DB_DRIVER`, `DB_USERNAME`, `DB_PASSWORD`, or `DB_TRUSTED_CONNECTION` variables are used by the converted runtime.
