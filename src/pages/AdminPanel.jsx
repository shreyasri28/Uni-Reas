import { useState } from 'react'
import { Users, Briefcase, CheckCircle, BarChart3, Edit2, Trash2, Filter } from 'lucide-react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock admin stats
  const adminStats = [
    { icon: Users, label: 'Total Users', value: '240', color: 'blue' },
    { icon: Users, label: 'Active Researchers', value: '185', color: 'green' },
    { icon: Briefcase, label: 'Active Projects', value: '64', color: 'purple' },
    { icon: CheckCircle, label: 'Approved Requests', value: '342', color: 'green' }
  ]

  // Mock users data
  const users = [
    { id: 1, name: 'Sample User', email: 'sample@uni.edu', role: 'student', status: 'active' },
    { id: 2, name: 'Dr. Emily Chen', email: 'emily@uni.edu', role: 'faculty', status: 'active' },
    { id: 3, name: 'Sarah Anderson', email: 'sarah@uni.edu', role: 'student', status: 'active' },
    { id: 4, name: 'Prof. James Wilson', email: 'james@uni.edu', role: 'faculty', status: 'inactive' },
  ]

  // Mock collaboration requests
  const collaborationRequests = [
    { id: 1, from: 'Sample User', to: 'Dr. Emily Chen', status: 'pending', date: '2024-01-15' },
    { id: 2, from: 'Sarah Anderson', to: 'Prof. James Wilson', status: 'accepted', date: '2024-01-14' },
    { id: 3, from: 'Michael Brown', to: 'Dr. Emily Chen', status: 'rejected', date: '2024-01-13' },
    { id: 4, from: 'Lisa White', to: 'Prof. James Wilson', status: 'pending', date: '2024-01-12' },
  ]

  const filteredRequests = statusFilter === 'all' 
    ? collaborationRequests 
    : collaborationRequests.filter(r => r.status === statusFilter)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage users, requests, and system analytics</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 font-semibold transition border-b-2 ${
                    activeTab === 'overview'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-4 font-semibold transition border-b-2 ${
                    activeTab === 'users'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-6 py-4 font-semibold transition border-b-2 ${
                    activeTab === 'requests'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  Collaboration Requests
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-6 py-4 font-semibold transition border-b-2 ${
                    activeTab === 'analytics'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  Analytics
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'users' && <UsersTab users={users} />}
                {activeTab === 'requests' && (
                  <RequestsTab 
                    requests={filteredRequests} 
                    statusFilter={statusFilter}
                    onFilterChange={setStatusFilter}
                  />
                )}
                {activeTab === 'analytics' && <AnalyticsTab />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-2">System Status</h3>
        <p className="text-blue-700 mb-4">All systems are operational</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-green-700">System Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Last 30 Days</p>
          <p className="text-2xl font-bold text-gray-900">128 ↑</p>
          <p className="text-xs text-green-600 mt-2">+12% new users</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Collaboration Rate</p>
          <p className="text-2xl font-bold text-gray-900">78%</p>
          <p className="text-xs text-green-600 mt-2">Active collaborations</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Avg. Response Time</p>
          <p className="text-2xl font-bold text-gray-900">2.4h</p>
          <p className="text-xs text-green-600 mt-2">Request approval</p>
        </div>
      </div>
    </div>
  )
}

function UsersTab({ users }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Role</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-900 font-medium">{user.name}</td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4">
                  <span className="capitalize px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`capitalize px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RequestsTab({ requests, statusFilter, onFilterChange }) {
  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <select
          value={statusFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">From</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">To</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-900 font-medium">{request.from}</td>
                <td className="py-4 px-4 text-gray-600">{request.to}</td>
                <td className="py-4 px-4">
                  <span className={`capitalize px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">{request.date}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {request.status === 'pending' && (
                      <>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg font-semibold transition">
                          Accept
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg font-semibold transition">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Bar Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Total Collaborations (Last 12 Months)
        </h3>
        <div className="h-64 bg-gradient-to-b from-blue-100 to-transparent rounded-lg flex items-end justify-around p-4">
          {[65, 78, 85, 92, 88, 95, 102, 115, 128, 135, 142, 150].map((value, idx) => (
            <div key={idx} className="w-6 flex flex-col items-center group">
              <div 
                className="w-6 bg-gradient-to-t from-primary-600 to-primary-500 rounded-t hover:from-primary-700 transition"
                style={{ height: `${(value / 150) * 200}px` }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{['J','F','M','A','M','J','J','A','S','O','N','D'][idx]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-accent-50 to-green-50 border border-accent-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Successful Collaborations</p>
          <p className="text-3xl font-bold text-accent-600">342</p>
          <p className="text-xs text-accent-600 mt-2">↑ 8% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Avg Team Size</p>
          <p className="text-3xl font-bold text-blue-600">3.8</p>
          <p className="text-xs text-blue-600 mt-2">members per project</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-medium mb-2">Project Success Rate</p>
          <p className="text-3xl font-bold text-purple-600">92%</p>
          <p className="text-xs text-purple-600 mt-2">completed on time</p>
        </div>
      </div>
    </div>
  )
}
