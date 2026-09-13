# Intellix Enterprise Platform

Intellix combines a public company website, CRM, project operations, LMS, client/student/instructor portals, enterprise modules and an AI knowledge assistant.

## Configure once

1. Create `backend/.env` from `backend/.env.example` and set your Neon `DATABASE_URL`, a strong `SECRET_KEY`, and optional LLM variables.
2. `frontend/.env.local` is created automatically from its local example the first time you run the platform if it does not exist.
3. For an existing Neon database, initialize any missing tables from the project root:

```powershell
python scripts\init_postgres.py
```

This is safe for existing data: SQLAlchemy creates missing tables and does not drop current rows.

## One command local development

From the repository root:

```powershell
npm run dev
```

On the first run, Intellix automatically installs missing frontend packages and creates/installs the root Python virtual environment. If `backend/.env` is missing, it creates a safe template and asks you to add the Neon connection before continuing.

Then both services run together:
- Next.js frontend: `http://127.0.0.1:3000`
- FastAPI backend: `http://127.0.0.1:8000`
- Swagger: `http://127.0.0.1:8000/docs`

You can still run setup explicitly with `npm run setup` if desired.

## LMS workflow

Admin/Super Admin creates a course → adds lessons → publishes it → enrolls a registered student → creates assignments → student learns/submits → instructor/admin grades → student sees results. Published courses also appear automatically in the public `/academy` catalog.

See:
- `docs/LMS_WORKFLOW.md`
- `docs/ROLE_ACCESS.md`
- `docs/ARCHITECTURE.md`
- `INTELLIX_2_1_RELEASE.md`

## Checks before deployment

```powershell
npm run check
npm run build
```

## Production architecture

- Frontend: Vercel
- Backend: FastAPI host such as Render/Railway
- Database: Neon PostgreSQL
- Source: GitHub
