import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

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

export const AuthContext = React.createContext(null)

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="mt-4 text-sm text-gray-600">Loading your workspace…</p>
      </div>
    </div>
  )
}

function RequireAuth({ children }) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = React.useContext(AuthContext)

  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }
  return children
}

function GuestOnly({ children }) {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext)
  if (isLoading) return <LoadingScreen />
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

function RequireAdmin({ children }) {
  const { currentUser } = React.useContext(AuthContext)
  return currentUser?.role === 'admin'
    ? children
    : <Navigate to="/dashboard" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/signin" element={<GuestOnly><SignIn /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />

      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/directory" element={<RequireAuth><Directory /></RequireAuth>} />
      <Route path="/profile/:userId" element={<RequireAuth><UserProfile /></RequireAuth>} />
      <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
      <Route path="/projects/:projectId" element={<RequireAuth><ProjectHub /></RequireAuth>} />
      <Route path="/requests" element={<RequireAuth><Requests /></RequireAuth>} />
      <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
      <Route path="/matches" element={<RequireAuth><Matches /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
      <Route path="/admin" element={<RequireAuth><RequireAdmin><AdminPanel /></RequireAdmin></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function restoreSession() {
      if (!localStorage.getItem('authToken')) {
        localStorage.removeItem('currentUser')
        if (active) setIsLoading(false)
        return
      }

      try {
        const user = await authService.getMe()
        if (active) {
          setCurrentUser(user)
          setIsAuthenticated(true)
        }
      } catch {
        authService.logout()
        if (active) {
          setCurrentUser(null)
          setIsAuthenticated(false)
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    restoreSession()
    return () => { active = false }
  }, [])

  const handleSignOut = useCallback(() => {
    authService.logout()
    setCurrentUser(null)
    setIsAuthenticated(false)
  }, [])

  const contextValue = useMemo(() => ({
    isAuthenticated,
    isLoading,
    currentUser,
    setCurrentUser,
    setIsAuthenticated,
    handleSignOut
  }), [isAuthenticated, isLoading, currentUser, handleSignOut])

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
