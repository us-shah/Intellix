# Intellix 2.1.1 Windows launcher fix

`npm run dev` now launches Windows `npm.cmd` through the command shell during first-run setup and while starting the frontend. This fixes the setup stopping immediately after `npm.cmd --prefix frontend install`.

## First run

```powershell
cd <project>
npm run dev
```

The launcher installs frontend dependencies, creates `.venv`, installs backend requirements, then starts both Next.js and FastAPI.

If `backend/.env` is missing, a safe template is created and the launcher stops so you can add your Neon `DATABASE_URL` and `SECRET_KEY`. Run `npm run dev` again afterward.
