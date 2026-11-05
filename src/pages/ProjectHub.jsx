import { useState } from 'react'
import { Send, FileText, CheckSquare, MessageSquare } from 'lucide-react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function ProjectHub() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('chat')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, author: 'Dr. Emily Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', text: 'Great work on the dataset preprocessing!', timestamp: '2 hours ago', isOwn: false },
    { id: 2, author: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You', text: 'Thanks! Should we start on model training next?', timestamp: '1 hour ago', isOwn: true },
    { id: 3, author: 'Dr. Emily Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', text: 'Yes, let\'s schedule a meeting to discuss the approach.', timestamp: '30 minutes ago', isOwn: false }
  ])

  const files = [
    { id: 1, name: 'dataset.csv', size: '2.4 MB', date: 'Jan 15, 2024' },
    { id: 2, name: 'model_v2.py', size: '45 KB', date: 'Jan 14, 2024' },
    { id: 3, name: 'research_paper.pdf', size: '1.8 MB', date: 'Jan 10, 2024' }
  ]

  const tasks = [
    { id: 1, title: 'Data preprocessing', assignee: 'You', status: 'completed' },
    { id: 2, title: 'Model architecture design', assignee: 'Dr. Emily Chen', status: 'in-progress' },
    { id: 3, title: 'Testing and validation', assignee: 'You', status: 'pending' }
  ]

  const getAutoReply = (text) => {
    const value = text.trim().toLowerCase()

    if (!value) return 'Sounds good. I’ll take care of it.'

    if (/(hello|hi|hey|morning|good morning|good evening)/.test(value)) {
      return 'Hi! I’m on board. Let’s move ahead with the plan and keep the momentum going.'
    }

    if (/(thanks|thank you|thankyou|appreciate it|grateful)/.test(value)) {
      return 'You’re welcome! I’ll keep the project moving and share the next update soon.'
    }

    if (/(meeting|schedule|time|when can we meet|can we meet|let's meet|lets meet)/.test(value)) {
      return 'Let’s plan for tomorrow at 3:00 PM. I’ll share the agenda and notes before the meeting.'
    }

    if (/(paper|draft|report|review|writeup|manuscript)/.test(value)) {
      return 'Perfect. I’ll review the draft and send my comments by tonight.'
    }

    if (/(file|document|upload|send the file|uploaded|share the file)/.test(value)) {
      return 'I’ll upload the updated file in the project folder and share the latest version with the team.'
    }

    if (/(deadline|due|task|todo|milestone|deliverable)/.test(value)) {
      return 'I’ll take care of it and update you once the task is completed.'
    }

    if (/(next|what's next|what is next|plan|roadmap)/.test(value)) {
      return 'Our next step is to finalize the model pipeline, validate the results, and prepare the summary for the team update.'
    }

    if (/(good job|nice work|great job|well done|excellent)/.test(value)) {
      return 'Thank you! I’m glad the progress is on track. Let’s keep pushing toward the next milestone.'
    }

    if (/(can you|could you|please)/.test(value)) {
      return 'Absolutely. I’ll handle that and update you as soon as I finish.'
    }

    if (/(difficult|issue|problem|error|bug|blocked)/.test(value)) {
      return 'I can help with that. Let’s review the issue together and figure out the quickest fix.'
    }

    return 'Sounds good. I’ll review that and get back to you with an update soon.'
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const text = message.trim()
    const newMessage = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      text,
      timestamp: 'just now',
      isOwn: true
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        author: 'Dr. Emily Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        text: getAutoReply(text),
        timestamp: 'just now',
        isOwn: false
      }

      setMessages(prev => [...prev, reply])
    }, 900)
  }

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
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Research Project Hub</h1>
              <p className="text-gray-600 mt-1">Collaborate with your team on research</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-6 py-4 font-semibold transition border-b-2 flex items-center gap-2 ${
                    activeTab === 'chat'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`px-6 py-4 font-semibold transition border-b-2 flex items-center gap-2 ${
                    activeTab === 'files'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Files
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-6 py-4 font-semibold transition border-b-2 flex items-center gap-2 ${
                    activeTab === 'tasks'
                      ? 'text-primary-600 border-primary-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  Tasks
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'chat' && (
                  <div className="space-y-4">
                    {/* Chat Messages */}
                    <div className="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto space-y-4 mb-4">
                      {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex gap-3 max-w-sm ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                            <img 
                              src={msg.avatar}
                              alt={msg.author}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div>
                              <div className={`px-4 py-2 rounded-lg ${
                                msg.isOwn 
                                  ? 'bg-primary-600 text-white' 
                                  : 'bg-white border border-gray-200 text-gray-900'
                              }`}>
                                <p className="text-sm">{msg.text}</p>
                              </div>
                              <p className={`text-xs ${msg.isOwn ? 'text-right' : ''} text-gray-500 mt-1`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg transition"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'files' && (
                  <div className="space-y-3">
                    {files.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 font-semibold">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'tasks' && (
                  <div className="space-y-3">
                    {tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <CheckSquare className={`w-5 h-5 ${
                            task.status === 'completed' ? 'text-green-600' :
                            task.status === 'in-progress' ? 'text-blue-600' :
                            'text-gray-400'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}>
                              {task.title}
                            </p>
                            <p className="text-xs text-gray-500">Assigned to: {task.assignee}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.status === 'completed' ? 'bg-green-100 text-green-700' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
