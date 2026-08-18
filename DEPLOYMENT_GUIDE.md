# Intellix Free Deployment Guide — PostgreSQL / Neon

This release targets PostgreSQL instead of SQL Server.

Recommended free/low-cost architecture:

```text
GitHub
├── frontend → Vercel
└── backend  → Render
                 ↓
              Neon PostgreSQL
```

## A. Database first

1. Create a Neon PostgreSQL project.
2. Copy the Neon connection string.
3. Put it in `backend/.env` as `DATABASE_URL`.
4. From `backend`, run:

```powershell
pip install -r requirements.txt
python ../scripts/init_postgres.py
```

5. To move your existing SQL Server `intellixDB` data, follow `POSTGRESQL_MIGRATION_GUIDE.md` and run `scripts/migrate_sqlserver_to_postgres.py`.

## B. Local verification against Neon

Set `backend/.env`:

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST/DB?sslmode=require
SECRET_KEY=YOUR_RANDOM_SECRET
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
RESET_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
DEBUG=true
LLM_API_KEY=
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

Run:

```powershell
uvicorn app.main:app --reload
```

Test `/health`, login, dashboard, LMS, knowledge, and AI.

## C. GitHub

Do not commit `.env`, `.env.local`, `node_modules`, `.next`, or secrets.

## D. Render backend

Use the included `render.yaml` or create a Web Service with:

```text
Root Directory: backend
Runtime: Docker
Health Check: /health
```

Set:

```env
DATABASE_URL=YOUR_NEON_CONNECTION_STRING
SECRET_KEY=YOUR_RANDOM_SECRET
FRONTEND_URL=https://YOUR-APP.vercel.app
DEBUG=false
LLM_API_KEY=OPTIONAL
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

## E. Vercel frontend

Import the same GitHub repository and choose:

```text
Root Directory: frontend
Framework: Next.js
```

Set:

```env
NEXT_PUBLIC_API_URL=https://YOUR-RENDER-API.onrender.com
```

Then update Render `FRONTEND_URL` to the final Vercel URL and redeploy.
