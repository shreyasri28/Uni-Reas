import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

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

function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, isLoading, currentUser } = React.useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-700" />
          <p className="mt-4 text-sm text-gray-600">Restoring your session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/signin" replace />
  if (adminOnly && currentUser?.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <Outlet />
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading Uni-Reas...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/signin'} replace />} />
      <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      <Route path="/login" element={<Navigate to="/signin" replace />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectHub />} />
        <Route path="/project/:projectId" element={<ProjectHub />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      <Route path="*" element={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <h1 className="text-5xl font-bold text-primary-900">404</h1>
          <p className="mt-3 text-gray-600">The page you are looking for could not be found.</p>
          <a href="/" className="mt-6 rounded-lg bg-primary-700 px-5 py-2.5 font-semibold text-white">Return to Uni-Reas</a>
        </div>
      } />
    </Routes>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    const restoreSession = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
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

  const handleSignOut = () => {
    authService.logout()
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const contextValue = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
    isLoading,
    handleSignOut
  }), [isAuthenticated, currentUser, isLoading])

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
