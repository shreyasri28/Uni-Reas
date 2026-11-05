# ⚡ Quick Start Guide

## 🚀 Running the Application

The development server is already running at:
```
http://localhost:5173/
```

## 🔐 Demo Credentials

```
Email:    demo@university.edu
Password: password123
```

## 📁 Project Folder Location

```
c:\Users\Shreya Sri\Desktop\Uni Reas
```

## 🛠️ Essential Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📖 Documentation

- **Full Setup Guide** → [README.md](./README.md)
- **Project Overview** → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- **API Integration** → [src/services/api.js](./src/services/api.js)
- **Mock Data** → [src/services/mockData.js](./src/services/mockData.js)

## 🎯 Pages Available

| Page | Route | Features |
|------|-------|----------|
| Sign In | `/signin` | Email/password login |
| Register | `/register` | User registration with role selection |
| Dashboard | `/dashboard` | Main dashboard with stats and activities |
| Directory | `/directory` | Search & discovery with filtering |
| User Profile | `/profile/:userId` | View researcher profiles |
| Project Hub | `/projects/:projectId` | Chat, files, and tasks |
| Admin Panel | `/admin` | User & request management |

## 🎨 Key Features

✅ **Authentication** - Sign up and sign in with mock data  
✅ **Dashboard** - Stats, activities, and quick actions  
✅ **Search & Discovery** - Find researchers with filters  
✅ **Collaboration** - Send requests and manage approvals  
✅ **Project Hub** - Team communication and task management  
✅ **Admin Panel** - Manage users and requests  
✅ **Responsive Design** - Works on mobile, tablet, and desktop  
✅ **Mock Data** - Full sample data for testing  

## 🔧 Configuration

Environment variables are in `.env` file (create from `.env.example`):

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_USE_MOCK_DATA=true
```

## 📦 Installed Packages

- React 18.2.0
- React Router 6.20.0
- Tailwind CSS 3.3.0
- Lucide React 0.294.0
- Axios 1.6.0
- Vite 5.0.0

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💡 Tips

1. **Clear Cache** if components don't update: `Ctrl + Shift + R`
2. **Check Console** for any errors: `F12` → Console tab
3. **Mock Data** can be modified in `src/services/mockData.js`
4. **API Endpoints** are configured in `src/services/api.js`
5. **Styling** can be customized in `tailwind.config.js`

## 🆘 Common Issues

### Port 5173 Already in Use?
```bash
npm run dev -- --port 3000
```

### Modules Not Found?
```bash
npm install
```

### Build Errors?
```bash
rm -r node_modules
npm install
npm run build
```

## 📱 Testing Checklist

- [ ] Sign in with demo credentials
- [ ] View dashboard with stats
- [ ] Search for researchers in directory
- [ ] View user profiles
- [ ] Send collaboration request
- [ ] Check notifications
- [ ] View project hub
- [ ] Access admin panel
- [ ] Test on mobile view (F12 → Toggle device toolbar)

## 🚀 Next Steps

1. **Connect Backend**: Update API endpoints in `src/services/api.js`
2. **Customize Theme**: Modify `tailwind.config.js`
3. **Add More Pages**: Create new files in `src/pages/`
4. **Deploy**: Build and deploy `dist/` folder to hosting

## 📞 File Locations

```
Project Root (c:\Users\Shreya Sri\Desktop\Uni Reas)
│
├── src/
│   ├── pages/          ← Page components here
│   ├── components/     ← Reusable components here
│   ├── services/       ← API calls here
│   ├── App.jsx         ← Routes configuration
│   └── index.css       ← Global styles
│
├── package.json        ← Dependencies
├── tailwind.config.js  ← Tailwind theme
├── vite.config.js      ← Vite config
└── index.html          ← HTML entry point
```

## 🎯 React Component Structure

All components follow this pattern:

```jsx
import { useState } from 'react'
import { Icon } from 'lucide-react'
import Header from '../components/Header'

export default function PageName() {
  const [state, setState] = useState(null)

  return (
    <div>
      <Header />
      {/* Page content */}
    </div>
  )
}
```

## 🌟 You're Ready!

Everything is set up and ready to go. Open your browser and visit:

```
http://localhost:5173/
```

Enjoy building! 🎉
