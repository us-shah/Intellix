# Intellix Platform Architecture

## Runtime
- **Frontend:** Next.js / React / Tailwind CSS
- **Backend:** FastAPI / SQLAlchemy
- **Database:** PostgreSQL on Neon
- **Authentication:** JWT with role-aware portal routing
- **AI:** RAG knowledge retrieval with optional external LLM provider and local retrieval fallback

## Main areas
- Public website and Academy catalog
- CRM: companies, customers, contacts, leads and deals
- Project operations: projects, tasks, meetings, documents
- LMS: courses, lessons, enrollments, progress, assignments, submissions and grading
- Portals: student, instructor and client
- Enterprise modules: HR, finance and support starter modules
- AI workspace and knowledge base
- Admin/Super Admin command center

## Recommended deployment
- Vercel: Next.js frontend
- FastAPI host: Render/Railway/another Python service
- Neon: PostgreSQL database
- GitHub: source control

The frontend and backend remain separate services in production, but local development is orchestrated from the repository root with one command.
