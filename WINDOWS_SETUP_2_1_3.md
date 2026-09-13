# Intellix 2.1.3 Windows setup fix

This release removes the unconditional `ensurepip --upgrade` step from first-run setup.

The launcher now:

1. installs frontend dependencies,
2. creates `.venv` only when needed,
3. checks whether pip already works,
4. recreates `.venv` only if pip is actually missing/damaged,
5. installs backend requirements,
6. verifies FastAPI, Uvicorn, SQLAlchemy and psycopg2,
7. starts frontend and backend together with `npm run dev`.
