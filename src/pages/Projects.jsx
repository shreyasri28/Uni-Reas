import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, ArrowUpRight, Users } from 'lucide-react'
import { mockData } from '../services/mockData'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const projects = mockData.projects || []

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
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-2 text-lg">Explore active collaborations and research initiatives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Active</p>
                  <FolderOpen className="w-5 h-5 text-primary-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Team members</p>
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">18</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Milestones</p>
                  <ArrowUpRight className="w-5 h-5 text-amber-600" />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">07</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{project.name}</h3>
                      <p className="mt-2 text-gray-600">{project.description}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Active
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
                    <span>{project.members?.length || 0} members</span>
                    <span>{project.createdDate}</span>
                  </div>

                  <div className="mt-5">
                    <div className="flex -space-x-2">
                      {project.members?.slice(0, 4).map((member, index) => (
                        <div
                          key={member.id || index}
                          className="w-9 h-9 rounded-full border-2 border-white bg-primary-100 text-primary-700 flex items-center justify-center text-[10px] font-bold"
                          title={member.name}
                        >
                          {member.name.split(' ').map(part => part[0]).slice(0, 2).join('')}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
