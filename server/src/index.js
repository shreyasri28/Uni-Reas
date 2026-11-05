import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomInt, randomUUID, createHash } from 'node:crypto'
import { getUsers, saveUsers, getPending, savePending } from './store.js'
import { sendVerificationEmail } from './mailer.js'

const app = express()
const PORT = Number(process.env.PORT || 3000)
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('Set JWT_SECRET in server/.env to a random string of at least 32 characters.')
  process.exit(1)
}
app.use(helmet())
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(v => v.trim()), credentials: true }))
app.use(express.json({ limit: '20kb' }))
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-7', legacyHeaders: false }))

const normalizeEmail = value => String(value || '').trim().toLowerCase()
const hashCode = code => createHash('sha256').update(code).digest('hex')
const makeToken = user => jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' })
const publicUser = ({ passwordHash, ...user }) => user
const authRequired = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
    const payload = jwt.verify(token, JWT_SECRET)
    const user = (await getUsers()).find(item => item.id === payload.sub)
    if (!user || !user.verified) return res.status(401).json({ message: 'Please sign in again.' })
    req.user = user
    next()
  } catch { return res.status(401).json({ message: 'Your session is invalid or has expired. Please sign in again.' }) }
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Uni-Reas API' }))

app.post('/api/auth/register', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim()
    const email = normalizeEmail(req.body.email)
    const password = String(req.body.password || '')
    const role = req.body.role === 'faculty' ? 'faculty' : 'student'
    const department = String(req.body.department || '').trim()
    if (name.length < 2 || name.length > 100) return res.status(400).json({ message: 'Enter a valid full name.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' })
    const domain = String(process.env.ALLOWED_EMAIL_DOMAIN || '').trim().toLowerCase()
    if (domain && email.split('@')[1] !== domain) return res.status(400).json({ message: `Use your university email ending in @${domain}.` })
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' })
    const users = await getUsers()
    if (users.some(user => user.email === email)) return res.status(409).json({ message: 'An account with this email already exists. Please sign in.' })
    const passwordHash = await bcrypt.hash(password, 12)
    const code = String(randomInt(100000, 1000000))
    const pending = await getPending()
    const entry = { id: randomUUID(), name, email, passwordHash, role, department, codeHash: hashCode(code), expiresAt: Date.now() + 10 * 60 * 1000, attempts: 0, createdAt: Date.now() }
    await savePending([...pending.filter(item => item.email !== email), entry])
    try { await sendVerificationEmail(email, code, name) }
    catch (error) {
      await savePending((await getPending()).filter(item => item.email !== email))
      console.error('Verification email error:', error.message)
      return res.status(503).json({ message: error.message.includes('not configured') ? error.message : 'Could not send the verification email. Check SMTP settings and try again.' })
    }
    return res.status(200).json({ message: 'A 6-digit verification code has been sent to your email address.' })
  } catch (error) { console.error(error); return res.status(500).json({ message: 'Registration failed. Please try again.' }) }
})

app.post('/api/auth/resend-code', async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email)
    const pending = await getPending()
    const entry = pending.find(item => item.email === email)
    if (!entry) return res.status(404).json({ message: 'Registration not found. Please register again.' })
    const code = String(randomInt(100000, 1000000))
    entry.codeHash = hashCode(code); entry.expiresAt = Date.now() + 10 * 60 * 1000; entry.attempts = 0
    await savePending(pending)
    try { await sendVerificationEmail(email, code, entry.name) }
    catch (error) { console.error(error); return res.status(503).json({ message: 'Could not resend the email. Check SMTP settings and try again.' }) }
    return res.json({ message: 'A new verification code has been sent.' })
  } catch { return res.status(500).json({ message: 'Could not resend the code.' }) }
})

app.post('/api/auth/verify-email', async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email)
    const code = String(req.body.code || '').trim()
    if (!/^\d{6}$/.test(code)) return res.status(400).json({ message: 'Enter the 6-digit code.' })
    const pending = await getPending()
    const entry = pending.find(item => item.email === email)
    if (!entry) return res.status(400).json({ message: 'No pending registration found. Please register again.' })
    if (entry.expiresAt < Date.now()) {
      await savePending(pending.filter(item => item.email !== email))
      return res.status(400).json({ message: 'The code has expired. Please register again.' })
    }
    if (entry.attempts >= 5) return res.status(429).json({ message: 'Too many incorrect attempts. Request a new code.' })
    if (entry.codeHash !== hashCode(code)) {
      entry.attempts += 1; await savePending(pending)
      return res.status(400).json({ message: 'Incorrect verification code.' })
    }
    const users = await getUsers()
    if (users.some(user => user.email === email)) return res.status(409).json({ message: 'This email is already registered.' })
    const user = { id: entry.id, name: entry.name, email: entry.email, role: entry.role, department: entry.department, verified: true, profileComplete: false, profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(entry.name)}`, createdAt: new Date().toISOString(), passwordHash: entry.passwordHash }
    await saveUsers([...users, user])
    await savePending(pending.filter(item => item.email !== email))
    return res.json({ message: 'Email verified successfully.', token: makeToken(user), user: publicUser(user) })
  } catch (error) { console.error(error); return res.status(500).json({ message: 'Email verification failed.' }) }
})

app.post('/api/auth/signin', async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email)
    const password = String(req.body.password || '')
    const user = (await getUsers()).find(item => item.email === email)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Incorrect email or password.' })
    if (!user.verified) return res.status(403).json({ message: 'Please verify your email before signing in.' })
    return res.json({ token: makeToken(user), user: publicUser(user) })
  } catch { return res.status(500).json({ message: 'Sign in failed. Please try again.' }) }
})

app.get('/api/auth/me', authRequired, (req, res) => res.json({ user: publicUser(req.user) }))
app.listen(PORT, () => console.log(`Uni-Reas API running at http://localhost:${PORT}`))
