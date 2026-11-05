// Mock Data Service for Development
// Replace with actual API calls by using the api service

export const mockData = {
  users: [
    {
      id: '1',
      name: 'Sample User',
      email: 'sample@university.edu',
      role: 'student',
      department: 'Computer Science',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SampleUser',
      about: 'Passionate about AI and machine learning',
      researchInterests: ['AI', 'Machine Learning', 'Data Science'],
      skills: ['Python', 'TensorFlow', 'Data Analysis'],
      yearsExperience: 1
    },
    {
      id: '2',
      name: 'Dr. Emily Chen',
      email: 'emily@university.edu',
      role: 'faculty',
      department: 'Computer Science',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      about: 'Researcher focused on machine learning and AI applications',
      researchInterests: ['Machine Learning', 'AI', 'Deep Learning'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Research'],
      yearsExperience: 8,
      publications: 23
    },
    {
      id: '3',
      name: 'Sarah Anderson',
      email: 'sarah@university.edu',
      role: 'student',
      department: 'Biology',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      about: 'Interested in biomedical research',
      researchInterests: ['Biomedical Research', 'Data Analysis'],
      skills: ['Lab Work', 'Data Analysis', 'Python'],
      yearsExperience: 2
    }
  ],

  projects: [
    {
      id: '1',
      name: 'AI in Medical Imaging',
      description: 'Using deep learning to improve medical image analysis',
      status: 'active',
      members: [
        { id: '2', name: 'Dr. Emily Chen', role: 'lead' },
        { id: '1', name: 'Sample User', role: 'member' }
      ],
      createdDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Natural Language Processing Research',
      description: 'Developing NLP models for academic text analysis',
      status: 'active',
      members: [
        { id: '2', name: 'Dr. Emily Chen', role: 'lead' },
        { id: '3', name: 'Sarah Anderson', role: 'member' }
      ],
      createdDate: '2024-01-05'
    }
  ],

  collaborationRequests: [
    {
      id: '1',
      from: { id: '1', name: 'Sample User' },
      to: { id: '2', name: 'Dr. Emily Chen' },
      status: 'pending',
      message: 'I would love to collaborate on your AI research project',
      date: '2024-01-15',
      type: 'collaboration'
    },
    {
      id: '2',
      from: { id: '2', name: 'Dr. Emily Chen' },
      to: { id: '3', name: 'Sarah Anderson' },
      status: 'accepted',
      message: 'Great work on your research proposal. Let\'s collaborate!',
      date: '2024-01-14',
      type: 'collaboration'
    }
  ],

  notifications: [
    {
      id: '1',
      type: 'collaboration_request',
      title: 'New Collaboration Request',
      message: 'Dr. Emily Chen sent you a collaboration request',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'request_accepted',
      title: 'Collaboration Request Accepted',
      message: 'Your collaboration request to Prof. James Wilson was accepted',
      timestamp: '2024-01-14T14:20:00Z',
      read: false
    },
    {
      id: '3',
      type: 'project_update',
      title: 'Project Update',
      message: 'AI Research project has a new update',
      timestamp: '2024-01-13T09:15:00Z',
      read: true
    }
  ],

  messages: {
    '1': [
      {
        id: '1',
        senderId: '2',
        senderName: 'Dr. Emily Chen',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        content: 'Great work on the dataset preprocessing!',
        timestamp: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'Sample User',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SampleUser',
        content: 'Thanks! Should we start on model training next?',
        timestamp: '2024-01-15T14:45:00Z'
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Dr. Emily Chen',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        content: 'Yes, let\'s schedule a meeting to discuss the approach.',
        timestamp: '2024-01-15T15:00:00Z'
      }
    ]
  },

  activities: [
    {
      id: '1',
      type: 'collaboration_accepted',
      user: 'Dr. Emily Chen',
      action: 'accepted your collaboration request',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'collaboration_request',
      user: 'Prof. James Wilson',
      action: 'sent you a collaboration request',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'project_join',
      user: 'Sarah Anderson',
      action: 'joined your project "AI Research"',
      timestamp: '1 day ago'
    },
    {
      id: '4',
      type: 'match_recommendation',
      user: 'Dr. Michael Brown',
      action: 'was recommended as a match based on your interests',
      timestamp: '2 days ago'
    }
  ],

  adminStats: {
    totalUsers: 240,
    activeResearchers: 185,
    activeProjects: 64,
    approvedRequests: 342,
    collaborationRate: 78,
    avgResponseTime: '2.4h',
    newUsersThisMonth: 128,
    newUsersPercentage: 12
  }
}

// Mock API Response Handlers
export const mockApiHandlers = {
  // User endpoints
  getUserProfile: (userId) => {
    return mockData.users.find(u => u.id === userId) || mockData.users[0]
  },

  searchUsers: (query, filters = {}) => {
    let results = mockData.users

    if (query) {
      results = results.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.researchInterests.some(i => i.toLowerCase().includes(query.toLowerCase()))
      )
    }

    if (filters.department) {
      results = results.filter(u => u.department === filters.department)
    }

    if (filters.role) {
      results = results.filter(u => u.role === filters.role)
    }

    return results
  },

  getRecommendedMatches: (userId) => {
    // Simple recommendation based on shared interests
    const user = mockData.users.find(u => u.id === userId)
    if (!user) return []

    return mockData.users.filter(u => u.id !== userId).map(u => ({
      ...u,
      matchScore: Math.floor(
        (u.researchInterests.filter(i => user.researchInterests.includes(i)).length / 
         Math.max(u.researchInterests.length, user.researchInterests.length)) * 100
      )
    })).sort((a, b) => b.matchScore - a.matchScore)
  },

  // Collaboration endpoints
  sendCollaborationRequest: (fromId, toId, message) => {
    const id = mockData.collaborationRequests.length + 1
    const request = {
      id: id.toString(),
      from: mockData.users.find(u => u.id === fromId),
      to: mockData.users.find(u => u.id === toId),
      status: 'pending',
      message,
      date: new Date().toISOString(),
      type: 'collaboration'
    }
    mockData.collaborationRequests.push(request)
    return request
  },

  getCollaborationRequests: (status = 'all') => {
    if (status === 'all') {
      return mockData.collaborationRequests
    }
    return mockData.collaborationRequests.filter(r => r.status === status)
  },

  respondToRequest: (requestId, status) => {
    const request = mockData.collaborationRequests.find(r => r.id === requestId)
    if (request) {
      request.status = status
    }
    return request
  },

  // Project endpoints
  getProjects: () => mockData.projects,
  getProject: (projectId) => mockData.projects.find(p => p.id === projectId),
  
  // Message endpoints
  getMessages: (projectId) => mockData.messages[projectId] || [],
  sendMessage: (projectId, senderId, content) => {
    if (!mockData.messages[projectId]) {
      mockData.messages[projectId] = []
    }
    const sender = mockData.users.find(u => u.id === senderId)
    const message = {
      id: (mockData.messages[projectId].length + 1).toString(),
      senderId,
      senderName: sender.name,
      senderAvatar: sender.profilePicture,
      content,
      timestamp: new Date().toISOString()
    }
    mockData.messages[projectId].push(message)
    return message
  },

  // Admin endpoints
  getAdminStats: () => mockData.adminStats,
  getAdminUsers: (page = 1, limit = 10) => {
    const start = (page - 1) * limit
    return {
      users: mockData.users.slice(start, start + limit),
      total: mockData.users.length,
      page,
      limit
    }
  },

  getActivities: () => mockData.activities
}

export default mockData
