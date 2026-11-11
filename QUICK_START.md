# Uni-Reas — Quick Start

## Requirements
- Node.js 18 or newer
- npm
- SMTP credentials for the transactional email provider configured for the backend

## Install

From the repository root:

```bash
npm install
cd server
npm install
cd ..
```

## Configure email and authentication

Create `server/.env` by copying `server/.env.example`.

PowerShell:

```powershell
Copy-Item server/.env.example server/.env
```

Set a private JWT secret (at least 32 characters) and the SMTP host, port, username, password/key, and verified sender address. Set `CLIENT_ORIGIN=http://localhost:5173`.

Never commit `server/.env`, publish SMTP credentials, or put backend secrets in Vite variables. See [README.md](./README.md) for the full email-provider setup and deployment notes.

## Run locally

Open two terminals in the repository root.

Terminal 1 — backend:

```bash
npm run server
```

Terminal 2 — frontend:

```bash
npm run dev
```

Open http://localhost:5173. Check the backend at http://localhost:3000/api/health.

## Verify registration

1. Register with an email inbox you can access.
2. Check that inbox for the six-digit verification code.
3. Enter the code before it expires.
4. Sign out and sign in again with the same verified account.

There are no built-in demo credentials. Accounts are created through email verification.

## Available screens

| Screen | Route |
|---|---|
| Sign in | `/signin` |
| Register | `/register` |
| Dashboard | `/dashboard` |
| Researcher directory | `/directory` |
| User profile | `/profile/:userId` |
| Projects | `/projects` |
| Project workspace | `/projects/:projectId` |
| Collaboration requests | `/requests` |
| Notifications | `/notifications` |
| Recommended matches | `/matches` |
| Profile settings | `/settings` |
| Admin panel (admin role only) | `/admin` |

## Useful commands

```bash
npm run dev
npm run build
npm run preview
npm run server
npm run server:start
```

## Important implementation note

Email registration, verification, sign-in, and session restoration use the Express API. Several research, collaboration, project, notification, and administration screens still contain mock/sample data or browser-local state and are not yet fully backed by server APIs. Do not treat those screens as production-ready workflows until their backend integration is completed and tested.
