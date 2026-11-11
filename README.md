# Uni-Reas — University Research Collaboration Portal

React + Vite frontend with an Express authentication API.

## Real email verification

Registration creates a pending account on the server and sends a random 6-digit code to the submitted email. Codes expire after 10 minutes, are stored as SHA-256 hashes, and allow at most five incorrect attempts. A user is only saved as an active account after the correct code is submitted. Login checks the server's password hash and verified status. The old demo OTP and demo login accounts have been removed.

## Requirements

- Node.js 18 or newer
- npm
- MySQL Server 8.0 or newer
- A Brevo account with transactional email enabled and a verified sender address

Users registering with Uni-Reas do not need a Brevo account or 2-Step Verification. Brevo is only the service Uni-Reas uses to send the OTP emails.

## 1. Install frontend dependencies

From the project root:

```bash
npm install
```

## 2. Configure Brevo and the backend

Create a Brevo account at https://www.brevo.com/ and complete its sender/transactional-email setup.

In Brevo:
1. Open **Senders, Domains & Dedicated IPs** and add a sender email address you control. Verify it using the code Brevo sends to that address. Use a domain you own and authenticate it with the DNS records Brevo provides when possible.
2. Open **Settings → SMTP & API → SMTP**.
3. Copy the SMTP **Login** shown there. It may be your Brevo login email or a generated SMTP login.
4. Generate an **SMTP key** and copy it. Do not use an API key or your Brevo account password.

Install backend dependencies:

```bash
cd server
npm install
```

Create the MySQL database and tables by opening MySQL Workbench (or the MySQL CLI) and running the complete script in `server/database/schema.sql`. This creates the `uni_reas` database, `users` and `pending_verifications` tables.\n\nCopy `.env.example` to `.env` in the `server` folder. On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `server/.env` and set:

- `JWT_SECRET`: a long random secret (at least 32 characters)\n- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: your local MySQL connection details (normally `DB_NAME=uni_reas`)
- `SMTP_HOST=smtp-relay.brevo.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER`: the exact SMTP Login shown in Brevo's SMTP settings
- `SMTP_PASS`: the Brevo SMTP key (not an API key)
- `MAIL_FROM`: a sender address verified in your Brevo account, e.g. `"Uni-Reas <you@yourdomain.com>"`
- `CLIENT_ORIGIN=http://localhost:5173`

Brevo's official SMTP instructions: https://help.brevo.com/hc/en-us/articles/7924908994450-Send-transactional-emails-using-Brevo-SMTP

Do not share the SMTP key or commit the `.env` file to GitHub.

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
