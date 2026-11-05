import { useState } from 'react'
import { Sparkles, ArrowRight, Users } from 'lucide-react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const matches = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    specialty: 'Machine Learning',
    match: '96%',
    summary: 'Strong overlap in AI, data-driven workflows, and research collaboration.',
  },
  {
    id: 2,
    name: 'Sarah Anderson',
    specialty: 'Biomedical Research',
    match: '88%',
    summary: 'Highly aligned with experimental design and interdisciplinary research.',
  },
  {
    id: 3,
    name: 'Prof. James Wilson',
    specialty: 'Quantum Systems',
    match: '81%',
    summary: 'Promising fit for future interdisciplinary project collaboration.',
  },
]

export default function Matches() {
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
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Recommended Matches</h1>
              <p className="text-gray-600 mt-2 text-lg">Suggested collaborators and matches based on your profile.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Potential matches</p>
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{matches.length}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Best match</p>
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">96%</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Actionable</p>
                  <ArrowRight className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">03</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {matches.map((match) => (
                <div key={match.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                        {match.name.split(' ').map(part => part[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{match.name}</h3>
                        <p className="text-sm text-gray-500">{match.specialty}</p>
                      </div>
                    </div>
                    <span className="bg-primary-50 text-primary-700 rounded-full px-2.5 py-1.5 text-xs font-bold">
                      {match.match}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-600 leading-relaxed">{match.summary}</p>

                  <button className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition">
                    View profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
