import { useState } from 'react'
import { Bell, CheckCircle2, Sparkles, Clock3 } from 'lucide-react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const notifications = [
  {
    id: 1,
    title: 'Collaboration request accepted',
    detail: 'Dr. Emily Chen accepted your request for AI Research collaboration.',
    time: '2 hours ago',
    type: 'success'
  },
  {
    id: 2,
    title: 'New match recommended',
    detail: 'A researcher in Biomedical Engineering matches your current interests.',
    time: '5 hours ago',
    type: 'info'
  },
  {
    id: 3,
    title: 'Project update',
    detail: 'Your project “AI Research” has a new milestone update from the team.',
    time: '1 day ago',
    type: 'warning'
  }
]

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-2 text-lg">All your recent notifications are listed here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Unread</p>
                  <Bell className="w-5 h-5 text-primary-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">04</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">This week</p>
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">12</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Last checked</p>
                  <Clock3 className="w-5 h-5 text-amber-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">3h</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {notifications.map((item) => (
                  <div key={item.id} className="p-5 flex items-start gap-4 hover:bg-gray-50 transition">
                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : item.type === 'warning'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
