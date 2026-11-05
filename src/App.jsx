import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Directory from './pages/Directory'
import UserProfile from './pages/UserProfile'
import AdminPanel from './pages/AdminPanel'
import ProjectHub from './pages/ProjectHub'
import Projects from './pages/Projects'
import Requests from './pages/Requests'
import Notifications from './pages/Notifications'
import Matches from './pages/Matches'
import Settings from './pages/Settings'
import { authService } from './services/auth'

// Context for auth state
export const AuthContext = React.createContext()

function safeReadStoredUser() {
  try {
    const storedUser = localStorage.getItem('currentUser')
    if (!storedUser) return null
    const parsed = JSON.parse(storedUser)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch (error) {
    localStorage.removeItem('currentUser')
    return null
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        localStorage.removeItem('currentUser')
        setIsLoading(false)
        return
      }
      try {
        const user = await authService.getMe()
        setCurrentUser(user)
        setIsAuthenticated(true)
      } catch {
        authService.logout()
      } finally {
        setIsLoading(false)
      }
    }
    restoreSession()
  }, [])
