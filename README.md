# Uni-Reas — University Research Collaboration Portal

React + Vite frontend with an Express authentication API.

## Real email verification

Registration now creates a pending account on the server and sends a random 6-digit code to the submitted email. Codes expire after 10 minutes, are stored as SHA-256 hashes, and allow at most five incorrect attempts. A user is only saved as an active account after the correct code is submitted. Login checks the server's password hash and verified status. The old demo OTP and demo login accounts have been removed.

## Requirements

- Node.js 18 or newer
- npm
- A Gmail account with 2-Step Verification and a Google App Password, or another SMTP email provider

## 1. Install frontend dependencies

From the project root:

```bash
npm install
```

## 2. Configure the backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` in the `server` folder. On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `server/.env` and set:
- `JWT_SECRET`: a long random secret (at least 32 characters)
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER`: your sender Gmail address
- `SMTP_PASS`: a Google App Password (not your normal Gmail password)
- `MAIL_FROM`: your sender display name and email
- `CLIENT_ORIGIN=http://localhost:5173`

To create a Google App Password, enable 2-Step Verification in your Google Account, then open Google Account → Security → App passwords. Do not share the app password or commit the `.env` file to GitHub.

Optional: set `ALLOWED_EMAIL_DOMAIN=your-university-domain.edu` to restrict registration to that exact email domain. Leave it empty to allow normal email addresses.

## 3. Run the project (two terminals)

Terminal 1, from the project root:

```bash
npm run server
```

Terminal 2, from the project root:

```bash
npm run dev
```

Open http://localhost:5173. The API health check is http://localhost:3000/api/health.

## Registration test

1. Open Create Account and enter an email inbox you can access.
2. Submit the form. Uni-Reas should send a 6-digit verification email.
3. Enter the code before it expires.
4. After successful verification, the account is created and the user is signed in.
5. Sign out and sign in again with the same email and password.
6. An incorrect code, expired code, or unverified account must not be allowed to sign in.

## Data and security notes

For this student/demo deployment, the API persists accounts in JSON files under `server/data` (ignored by Git). Passwords use bcrypt hashing. Pending codes are hashed and expire. The API uses JWT sessions, rate limiting, Helmet, and CORS. This file-backed store is intended for local development or a single small instance; use a managed database such as PostgreSQL/MongoDB for multi-instance or production hosting. Deploy the frontend and backend separately and configure the backend environment variables on the hosting provider. Never expose SMTP credentials or JWT secrets in Vite variables.

Other portal screens still include mock/sample data and are not all backed by the authentication API yet.
