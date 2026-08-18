# Intellix authentication setup

Included: login, student registration, client registration, JWT protected routes, profile, logout, change password, forgot password and reset password.

## Backend `.env`

```env
SECRET_KEY=replace-with-a-long-random-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
RESET_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
DEBUG=true
```

With `DEBUG=true`, `/auth/forgot-password` returns a development reset URL. In production set `DEBUG=false` and connect an email provider.

## Run

```powershell
cd backend
uvicorn app.main:app --reload
```

```powershell
cd frontend
npm install
npm run dev
```

Pages: `/login`, `/register/student`, `/register/client`, `/forgot-password`, `/reset-password`, `/dashboard/change-password`.
