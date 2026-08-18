# Dashboard module

## Backend

Authenticated endpoint:

```text
GET /dashboard/stats
```

Returns KPI totals, monthly won revenue, deal-stage counts, recent activities, upcoming tasks, upcoming meetings, and recent deals.

## Frontend

Open:

```text
http://localhost:3000/dashboard
```

The frontend reads the JWT from the existing shared Axios client and calls `/dashboard/stats`.

## Test

1. Start FastAPI.
2. Login in the frontend.
3. Open `/dashboard`.
4. In Swagger, authorize and test `GET /dashboard/stats`.
