# Cher CRM Frontend

A minimal React + TypeScript frontend for the [Cher CRM Backend](https://github.com/Maame-Yaa/Cher-Backend). Built as part of a full-stack developer technical assessment for [Cher](https://cheralpha.com).

This frontend serves as a functional test interface for the backend API. I focused my time on the backend (FastAPI, JWT auth, CRUD, analytics) and built this to verify API integration end-to-end.

## Tech stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **HTTP client:** Axios with JWT token interceptor
- **Routing:** Single-page (no React Router, all sections on one page)

## What it covers

- User registration and login (JWT stored in localStorage)
- Axios client with automatic `Authorization: Bearer` header injection
- Lead creation form and lead listing
- Dashboard stats loading (total leads, leads by status, recent activities)
- Typed API layer (`api/auth.ts`, `api/leads.ts`, `api/activities.ts`, `api/dashboard.ts`)
- TypeScript interfaces for all API request/response shapes

## Project structure

```
src/
├── App.tsx                # Main page with auth, leads, and dashboard sections
├── api/
│   ├── client.ts          # Axios instance with base URL and token interceptor
│   ├── auth.ts            # Login, register, me, logout
│   ├── leads.ts           # List and create leads
│   ├── activities.ts      # Activity API calls
│   └── dashboard.ts       # Dashboard stats
├── pages/
│   ├── LoginPage.tsx
│   ├── LeadsPage.tsx
│   ├── ActivitiesPage.tsx
│   └── DashboardPage.tsx
└── types/
    └── index.ts           # Shared TypeScript interfaces
```

## Running locally

```bash
git clone https://github.com/Maame-Yaa/Cher-Frontend.git
cd Cher-Frontend

npm install
npm run dev
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:8000
```

The backend must be running for API calls to work. See [Cher-Backend](https://github.com/Maame-Yaa/Cher-Backend) for setup.

## Context

This was part of a 48-hour take-home assignment. The frontend is intentionally minimal. I prioritized backend architecture (authentication, data modeling, dashboard analytics) over frontend polish. The typed API client layer and auth flow demonstrate the integration pattern, and the pages directory contains the start of a multi-page layout I ran out of time to complete.
