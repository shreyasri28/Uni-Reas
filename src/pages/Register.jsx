import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, AlertCircle } from 'lucide-react'
import { AuthContext } from '../App'
import { authService } from '../services/auth'
import EmailVerificationModal from '../components/EmailVerificationModal'

export default function Register() {
  const [step, setStep] = useState('details')
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student', department: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated, setCurrentUser } = useContext(AuthContext)
  const handleInputChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleRegister = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (formData.name.trim().length < 2) throw new Error('Enter your full name.')
      if (formData.password.length < 8) throw new Error('Password must be at least 8 characters.')
      if (formData.password !== formData.confirmPassword) throw new Error('Passwords do not match.')
      await authService.register({ name: formData.name, email: formData.email, password: formData.password, role: formData.role, department: formData.department })
      setStep('verification')
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const handleVerifyEmail = async code => {
    const data = await authService.verifyEmail(formData.email, code)
    setCurrentUser(data.user); setIsAuthenticated(true); navigate('/dashboard')
  }

  if (step === 'verification') return <EmailVerificationModal email={formData.email} onVerify={handleVerifyEmail} onResend={() => authService.resendCode(formData.email)} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md"><div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold text-primary-900 mb-2">Create Account</h1><p className="text-gray-600">Join the research community</p></div>
        {error && <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"><AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /><p className="text-red-700 text-sm">{error}</p></div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label><div className="relative"><User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /><input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg" required /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><div className="relative"><Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /><input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="yourname@example.com" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg" required /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label><div className="space-y-2">{['student','faculty'].map(role => <label key={role} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg"><input type="radio" name="role" value={role} checked={formData.role === role} onChange={handleInputChange} /><span className="text-gray-700">{role === 'student' ? 'Student' : 'Faculty/Researcher'}</span></label>)}</div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Department/Organization</label><input name="department" value={formData.department} onChange={handleInputChange} placeholder="e.g. Computer Science" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /><input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="At least 8 characters" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg" required minLength={8} /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" /><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Re-enter password" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg" required /></div></div>
          <label className="flex items-start gap-3 cursor-pointer pt-2"><input type="checkbox" className="w-4 h-4 mt-1" required /><span className="text-sm text-gray-600">I agree to the Terms of Service and Privacy Policy.</span></label>
          <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg disabled:opacity-50">{loading ? 'Sending verification email...' : 'Create Account'}</button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/signin" className="text-primary-600 font-semibold">Sign in</Link></div>
      </div></div>
    </div>
  )
}
