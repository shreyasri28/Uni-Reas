import { useState, useContext } from 'react'
import { User, Mail, Briefcase, Award, Save, AlertCircle, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { currentUser, setCurrentUser, handleSignOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    department: currentUser?.department || '',
    yearsExperience: currentUser?.yearsExperience || 0,
    researchInterests: currentUser?.researchInterests?.join(', ') || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
    setSaved(false)
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.name.trim()) throw new Error('Name is required')
      if (!formData.email.includes('@')) throw new Error('Valid email is required')

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update user data
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        researchInterests: formData.researchInterests
          .split(',')
          .map(i => i.trim())
          .filter(i => i)
      }

      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      setSaved(true)

      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    handleSignOut()
    navigate('/signin')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-2xl">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings & Profile</h1>
                <p className="text-gray-600 mt-1">Update your personal information and preferences</p>
              </div>

              {/* Success Message */}
              {saved && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700">Profile updated successfully!</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Profile Form */}
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-600" />
                    Personal Information
                  </h2>

                  <div className="space-y-4">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                      <img 
                        src={currentUser?.profilePicture}
                        alt={currentUser?.name}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Profile Picture</p>
                        <p className="text-xs text-gray-500">Generated based on your name</p>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@university.edu"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                    Professional Information
                  </h2>

                  <div className="space-y-4">
                    {/* Department */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department / Organization
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science, Biology"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleInputChange}
                        min="0"
                        max="70"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    {/* Research Interests */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Research Interests
                      </label>
                      <textarea
                        name="researchInterests"
                        value={formData.researchInterests}
                        onChange={handleInputChange}
                        placeholder="e.g., Machine Learning, AI, Data Science (separated by commas)"
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      ></textarea>
                      <p className="text-xs text-gray-500 mt-2">Separate multiple interests with commas</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2.5 px-6 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Account Section */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <h2 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h2>
                <p className="text-red-700 mb-6 text-sm">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
