# To-Do App

Full-stack task management application with Express (TypeScript) backend and React frontend.

## Prerequisites

- Node.js 18+
- Docker Desktop (for database) or PostgreSQL
- npm or yarn

## Quick Start

### Database (Docker)

```bash
# From project root - starts PostgreSQL on port 5432
docker compose up -d

# Wait a few seconds, then run migrations
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

Or use the setup script (PowerShell):
```powershell
.\scripts\setup-db.ps1
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# .env defaults work with Docker Compose (postgres:postgres@localhost:5432/todo_app)
npx prisma generate
npm run dev
```

Backend runs at http://localhost:3000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173 (Vite dev server with proxy to backend)

### Default Login

After seeding: `john.doe@company.com` / `password123`

## Project Structure

```
backend/           # Express + TypeScript API
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dto/
│   ├── errors/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── validators/
├── prisma/
└── tests/

frontend/          # React + TypeScript
├── src/
│   ├── api/
│   ├── components/
│   ├── containers/
│   ├── hooks/
│   ├── pages/
│   └── types/
```

## API Base Path

All API routes are under `/v1`:
- `POST /v1/auth/login`
- `GET /v1/tasks`
- `POST /v1/tasks`
- etc.

## TODO Roadmap

1. **Backend**: Implement SSO callback, refresh token storage, role-based visibility
2. **Frontend**: Reports charts, notifications UI
3. **DevOps**: Docker Compose for local PostgreSQL

## testing
someting to tet