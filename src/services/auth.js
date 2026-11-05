import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

export const authService = {
  register: async userData => {
    try { return (await api.post('/auth/register', userData)).data }
    catch (error) { throw new Error(error.response?.data?.message || 'Could not start registration.') }
  },
  resendCode: async email => {
    try { return (await api.post('/auth/resend-code', { email })).data }
    catch (error) { throw new Error(error.response?.data?.message || 'Could not resend verification code.') }
  },
  verifyEmail: async (email, code) => {
    try {
      const data = (await api.post('/auth/verify-email', { email, code })).data
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      return data
    } catch (error) { throw new Error(error.response?.data?.message || 'Email verification failed.') }
  },
  signin: async (email, password) => {
    try {
      const data = (await api.post('/auth/signin', { email, password })).data
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      return data
    } catch (error) { throw new Error(error.response?.data?.message || 'Sign in failed.') }
  },
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
  }
}
