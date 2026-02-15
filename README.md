# Skill Badge Platform Frontend

> A cutting-edge, fully-featured web application for skill verification, interactive coding challenges, AI-powered mock interviews, and professional development with advanced gamification features, built with React 19 and TypeScript.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8+-010101?logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

| **Frontend** | 🟢 **Live** | [**Click here to visit App**](https://skillbadge-frontend.vercel.app) | Vercel |
| --- | --- | --- | --- |
| **Backend API** | 🟢 **Live** | [**Visit API Health**](https://github.com/Sachintha-Prabashana/skillbadge-backend.git) | Koyeb |

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Key Features Walkthrough](#key-features-walkthrough)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

The **Skill Badge Platform Frontend** is a comprehensive web application that enables users to showcase their skills, complete interactive coding challenges, participate in AI-powered mock interviews, earn badges, and compete on leaderboards. Built with cutting-edge technologies including React 19, TypeScript, Vite, and Socket.io, the platform provides an engaging, gamified learning experience with real-time collaboration features.

### What Makes This Special

- **🤖 AI-Powered Mock Interviews**: Practice technical interviews with AI interviewers using speech recognition and text-to-speech
- **🎮 Gamification**: Badge system, leaderboards, achievement tracking, and reward system
- **💻 Interactive Coding Challenges**: Built-in Monaco Code Editor with real-time code execution and validation
- **🧠 AI Assistant**: Smart in-editor AI helper for code hints and explanations (slide-out panel)
- **👥 Social Features**: Discussion forums, user profiles, community engagement, and real-time notifications
- **🎨 Modern UI/UX**: Responsive design with Tailwind CSS, Framer Motion animations, and mobile-optimized interface
- **🔐 Secure Authentication**: OAuth integration (Google, GitHub) and JWT-based authentication
- **📊 Admin Dashboard**: Comprehensive management tools with analytics and content moderation
- **⚡ Real-time Updates**: Socket.io integration for live contest tracking and instant notifications
- **🎤 Speech Features**: Text-to-speech in interviews and speech recognition for voice input
- **📱 Mobile-Responsive**: Optimized tablet and mobile experience with adaptive layouts

---

## ✨ Features

### 🎓 Learning & Development

- **Skill Badges**: Earn and display badges for completed skills and achievements
- **Interactive Coding Challenges**: Multiple difficulty levels with real-time code execution
- **Progress Tracking**: Detailed analytics and learning journey visualization
- **Skill Categories**: Organized learning paths across various technologies
- **Daily Challenges**: Special daily coding challenges with bonus rewards
- **Hint System**: AI-powered hints to guide learners without spoiling solutions

### 🤖 AI-Powered Features (NEW!)

- **Mock Interviews**: AI interviewers conduct realistic technical interviews
- **Speech Recognition**: Voice input for interview responses and questions
- **Text-to-Speech**: AI speaks interview questions and feedback
- **AI Assistant Panel**: In-editor AI helper for code suggestions and explanations
- **Smart Code Analysis**: Real-time code quality feedback and optimization suggestions
- **Hint Generation**: Context-aware hints based on challenge requirements

### 🏆 Gamification

- **Badge System**: Unlock badges by completing challenges and milestones
- **Leaderboards**: Global rankings, category-specific achievements, time-based leaderboards
- **Achievement System**: Track accomplishments and showcase expertise
- **Points & Rewards**: Earn points for participation, skill mastery, and challenge completion
- **Streak Tracking**: Maintain daily coding streaks and get bonus rewards

### 👨‍💼 User Experience

- **Personalized Dashboard**: Customized views based on user role (Admin, Instructor, Student)
- **User Profiles**: Showcase badges, achievements, skills, and activity history
- **Social Interaction**: Discussion forums, topic threads, and community collaboration
- **Real-time Notifications**: Live updates on challenges, badges, and community activity
- **Activity Feed**: See what other users are achieving in real-time

### 🛠️ Admin Capabilities

- **User Management**: Comprehensive user administration with role-based access
- **Badge Management**: Create, edit, assign, and track badges
- **Challenge Creation**: Build coding challenges with test cases and validation rules
- **Analytics Dashboard**: Monitor platform metrics, user engagement, and skill trends
- **Content Moderation**: Review discussions, manage submissions, and ensure quality
- **System Settings**: Configure platform features and global settings

### 💻 Technical Features

- **OAuth Authentication**: Google and GitHub seamless integration
- **Monaco Code Editor**: Professional VS Code editor with multiple language support
- **Real-time Code Execution**: Instant test case validation and results
- **Responsive Design**: Desktop, tablet, and mobile optimization
- **Dark Mode Support**: Eye-friendly interface for extended usage
- **File Upload**: Profile pictures and media attachments
- **Real-time Updates**: Live data synchronization via Socket.io
- **WebSocket Integration**: Live contest updates and instant notifications
- **Mobile-Responsive Tabs**: Adaptive mobile interface for challenge solver

---

## 🛠️ Tech Stack

### Core Technologies

- **[React 19.0.0](https://react.dev/)** - Latest React with modern features and hooks
- **[TypeScript 5.6+](https://www.typescriptlang.org/)** - Type-safe JavaScript with strict typing
- **[Vite 6.0+](https://vitejs.dev/)** - Next-generation frontend tooling with instant HMR
- **[React Router DOM 7.9](https://reactrouter.com/)** - Advanced client-side routing
- **[Socket.io-client 4.8+](https://socket.io/)** - Real-time bi-directional communication

### UI & Styling

- **[Tailwind CSS 4.1+](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.23+](https://www.framer.com/motion/)** - Advanced animations and interactions
- **[Lucide React 0.554+](https://lucide.dev/)** - Beautiful, customizable SVG icons
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes intelligently

### State Management & Data

- **React Context API** - Global state management for auth, UI, and notifications
- **[Axios 1.13+](https://axios-http.com/)** - Promise-based HTTP client
- **LocalStorage** - Persistent client-side data storage
- **React Hooks** - Advanced state and lifecycle management

### Code Editor & AI Features

- **[@monaco-editor/react 4.7+](https://github.com/suren-atoyan/monaco-react)** - VS Code editor integration
- **[React Markdown 10.1+](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Remark GFM 4.0+](https://github.com/remarkjs/remark-gfm)** - GitHub-flavored markdown support

### Speech & Audio Features

- **[React Speech Recognition 4.0+](https://github.com/JeanJeunet/react-speech-recognition)** - Web Speech API integration
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** - Browser native speech recognition and synthesis

### Data Visualization

- **[Recharts 3.5+](https://recharts.org/)** - Composable charting library
- **[React Confetti 6.4+](https://github.com/alampros/react-confetti)** - Celebration animations

### Toast & Notifications

- **[React Hot Toast 2.6+](https://react-hot-toast.com/)** - Beautiful toast notifications
- **[Sonner 2.0+](https://sonner.emilkowal.ski/)** - Elegant notification system
- **Socket.io Events** - Real-time event-driven notifications

### Utilities

- **[CLSX 2.1+](https://github.com/lukeed/clsx)** - Conditional className builder
- **[Regenerator Runtime 0.14+](https://github.com/facebook/regenerator)** - Async/await support

### Development Tools

- **[ESLint 9.39+](https://eslint.org/)** - Code linting and quality
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting rules
- **[Vite React Plugin](https://vitejs.dev/)** - Optimized React support in Vite

---

## 📁 Project Structure

```
skill-badge-platform-frontend/
├── public/                      # Static assets
│   └── vite.svg                # Vite logo
│
├── src/
│   ├── assets/                 # Images, fonts, and static resources
│   │   ├── logo.svg
│   │
│   ├── components/             # Reusable React components
│   │   ├── AdminSidebar.tsx           # Admin panel sidebar navigation
│   │   ├── AiAssistant.tsx            # AI helper slide-out panel (NEW!)
│   │   ├── BadgesSection.tsx          # User badges display
│   │   ├── ChatInput.tsx              # Interview chat input (NEW!)
│   │   ├── CodeEditor.tsx             # Monaco editor wrapper
│   │   ├── ConfirmModal.tsx           # Confirmation dialogs
│   │   ├── ContestLive.tsx            # Live contest display (NEW!)
│   │   ├── DashboardFeatureCards.tsx  # Dashboard feature cards
│   │   ├── EducationSection.tsx       # Learning resources
│   │   ├── Footer.tsx                 # Application footer
│   │   ├── Header.tsx                 # Main header navigation
│   │   ├── HeatmapSection.tsx         # Activity heatmap
│   │   ├── InterviewSetup.tsx         # Interview configuration (NEW!)
│   │   ├── LandingNavbar.tsx          # Landing page navbar
│   │   ├── Logo.tsx                   # Logo component
│   │   ├── MessageBubble.tsx          # Interview message display (NEW!)
│   │   ├── PodiumCard.tsx             # Leaderboard podium
│   │   ├── ProfileSidebar.tsx         # User profile sidebar
│   │   ├── ProgressSection.tsx        # Learning progress tracker
│   │   ├── RecentActivitySection.tsx  # Activity timeline
│   │   ├── Slidebar.tsx               # Sidebar navigation
│   │   ├── SocialButton.tsx           # Social sharing buttons
│   │   ├── SocialLogin.tsx            # OAuth login integration
│   │   ├── SolverHeader.tsx           # Challenge solver header
│   │   ├── StatRow.tsx                # Statistics display
│   │   └── SuccessModal.tsx           # Success celebration modal
│   │
│   ├── context/                # React Context providers
│   │   ├── authContext.tsx           # Authentication state & user management
│   │   ├── SidebarContext.tsx        # Sidebar visibility state
│   │   └── ToastContext.tsx          # Toast notifications state
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useTextToSpeech.ts        # Text-to-speech hook (NEW!)
│   │
│   ├── Layouts/                # Page layout components
│   │   ├── AdminLayout.tsx           # Admin panel layout
│   │   ├── AuthLayout.tsx            # Authentication pages layout
│   │   ├── DashboardLayout.tsx       # Dashboard layout
│   │   └── MarketingLayout.tsx       # Landing page layout
│   │
│   ├── pages/                  # Route-level components
│   │   ├── admin/
│   │   │   ├── CreateChallenge.tsx   # Challenge creation form
│   │   │   ├── Dashboard.tsx         # Admin dashboard
│   │   │   ├── ManageChallenges.tsx  # Challenge management
│   │   │   ├── ManageUsers.tsx       # User management
│   │   │   └── settings.tsx          # Admin settings
│   │   ├── AuthSuccess.tsx           # OAuth callback handler
│   │   ├── ChallengeSolver.tsx       # Coding challenge interface (ENHANCED!)
│   │   ├── Discuss.tsx               # Discussion forum
│   │   ├── ForgotPassword.tsx        # Password recovery
│   │   ├── Home.tsx                  # Homepage
│   │   ├── Index.tsx                 # Main page
│   │   ├── Leaderboard.tsx           # Rankings display
│   │   ├── Login.tsx                 # Login page
│   │   ├── MockInterview.tsx         # AI mock interview (NEW!)
│   │   ├── MyLists.tsx               # User's saved lists
│   │   ├── PostDetails.tsx           # Discussion post detail
│   │   ├── Profile.tsx               # User profile
│   │   ├── ProfileSettings.tsx       # Profile configuration
│   │   ├── Register.tsx              # Registration page
│   │   └── ResetPassword.tsx         # Password reset
│   │
│   ├── routes/                 # Routing configuration
│   │   └── index.tsx                 # Route definitions
│   │
│   ├── services/               # API service layer
│   │   ├── admin/
│   │   │   ├── admin.challenge.ts    # Challenge API
│   │   │   ├── admin.settings.ts     # Settings API
│   │   │   ├── admin.ts              # General admin API
│   │   │   └── admin.user.ts         # User management API
│   │   ├── api.ts                    # Axios instance & interceptors
│   │   ├── auth.ts                   # Authentication services
│   │   ├── challenge.ts              # Challenge-related API calls
│   │   ├── discuss.ts                # Discussion API
│   │   ├── interview.ts              # Mock interview API (NEW!)
│   │   └── user.ts                   # User profile API
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── interview.types.ts        # Interview interface types (NEW!)
│   │
│   ├── utils/                  # Utility functions
│   │   └── cn.ts                     # Class name utility
│   │
│   ├── App.css                 # Global component styles
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Global CSS with Tailwind imports
│   ├── main.tsx                # Application entry point
│   └── socket.ts               # Socket.io client configuration (NEW!)
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # TypeScript app configuration
├── tsconfig.node.json          # TypeScript node configuration
├── vite.config.ts              # Vite configuration
└── README.md
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0+)
- **Git** - [Download](https://git-scm.com/)
- **Backend API** - The Skill Badge Platform Backend must be running

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB for dependencies

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sachintha-Prabashana/skillbadge-frontend.git
cd skillbadge-frontend
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Configuration](#configuration) section below).

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_API_TIMEOUT=30000

# Application Configuration
VITE_APP_NAME=Skill Badge Platform
VITE_APP_VERSION=1.0.0

# OAuth Configuration (Frontend Redirect URLs)
VITE_GOOGLE_AUTH_URL=http://localhost:5000/api/v1/auth/google
VITE_GITHUB_AUTH_URL=http://localhost:5000/api/v1/auth/github

# Socket.io Configuration (Real-time Features)
VITE_SOCKET_IO_URL=http://localhost:5000
VITE_SOCKET_IO_PATH=/socket.io

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_MOCK_INTERVIEWS=true
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_SPEECH_RECOGNITION=true

# Interview Configuration
VITE_INTERVIEW_MAX_DURATION=3600000
VITE_INTERVIEW_SPEECH_LANG=en-US

# Upload Configuration
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Code Editor Configuration
VITE_MONACO_THEME=vs-dark
VITE_CODE_EXECUTION_TIMEOUT=5000

# AI Assistant Configuration
VITE_AI_HINT_COST=10
VITE_AI_RESPONSE_TIMEOUT=15000

# Environment
VITE_NODE_ENV=development
```

### Important Notes

- All environment variables in Vite **must be prefixed with `VITE_`** to be accessible in the client
- The `VITE_API_BASE_URL` should point to your running backend server
- The `VITE_SOCKET_IO_URL` enables real-time features (contests, notifications)
- Enable/disable feature flags based on your deployment requirements
- Speech recognition features require HTTPS in production
- Never commit the `.env` file to version control
- For production, update URLs, disable debug features, and adjust timeouts

---

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

**Features in Development Mode:**

- ⚡ Instant Hot Module Replacement (HMR)
- 🔍 Detailed error messages
- 🐛 React DevTools support
- 📊 Vite development dashboard

### Preview Production Build

To preview the production build locally:

```bash
npm run build
npm run preview
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 📦 Building for Production

### Create Production Build

```bash
npm run build
```

This command:

1. Runs TypeScript type checking
2. Compiles and optimizes code with Vite
3. Minifies JavaScript and CSS
4. Generates optimized assets in the `dist/` folder

### Build Output

```
dist/
├── assets/              # Compiled JS, CSS, and images
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images]
├── index.html           # Entry HTML file
└── vite.svg
```

### Production Optimization Features

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Removes unused code
- **Minification**: Compressed JavaScript and CSS
- **Asset Hashing**: Cache-busting file names
- **Compression**: Gzip/Brotli compression ready

---

## 🎮 Key Features Walkthrough

### 1. Authentication Flow

```typescript
// Login with email/password
await authService.login({ email, password });

// OAuth login (Google/GitHub)
window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;

// Access protected resources
const token = localStorage.getItem("token");
```

### 2. AI-Powered Mock Interviews (NEW!)

Practice technical interviews with AI:

```typescript
import { startMockInterview, sendInterviewReply } from "../services/interview";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

// Start a mock interview
const data = await startMockInterview("React.js", "Intermediate");
const { interviewId, message } = data;

// Send your answer and get AI feedback
const reply = await sendInterviewReply(interviewId, userAnswer);

// AI speaks the questions (text-to-speech)
const { speak } = useTextToSpeech(true);
speak(aiQuestion);
```

**Features:**
- AI interviewer based on selected tech stack
- Multiple difficulty levels
- Voice input support with speech recognition
- AI voice responses (text-to-speech)
- Real-time conversation feedback
- Interview completion tracking

### 3. Code Challenges with AI Assistant

Solve challenges with smart assistance:

```typescript
import { fetchChallengeById, runChallengeCode } from "../services/challenge";

// Load challenge details
const challenge = await fetchChallengeById(challengeId);

// Run and validate code
const result = await runChallengeCode({
    challengeId,
    language: "python",
    code: userCode
});
```

**Features:**
- Multiple programming languages support
- Real-time code validation
- Test case execution
- AI Assistant slide-out panel with code hints
- Mobile-responsive with code/problem tabs
- Syntax highlighting with Monaco Editor

### 4. AI Assistant In-Editor Helper (NEW!)

Get intelligent code suggestions:

- Context-aware code hints
- Explanation of problems and solutions
- Optimization suggestions
- No spoilers - guided learning approach
- Toggle panel for distraction-free coding
- Code analysis based on current submission

### 5. Badge System

Users can:

- Browse available badges by category
- View badge requirements and criteria
- Track progress toward earning badges
- Display earned badges on their profile
- Share achievements on social media
- Earn badges automatically upon challenge completion

### 6. Coding Challenges

Features:

- Monaco Editor integration (VS Code engine)
- Multiple programming languages support
- Real-time code execution
- Test case validation
- Difficulty levels (Easy, Medium, Hard)
- Solution submission and review
- Real-time execution results
- Daily challenges with bonus rewards

### 7. Leaderboard System

Track rankings by:

- Overall points and achievements
- Category-specific leaderboards
- Time-based rankings (Weekly/Monthly/All-time)
- Friend comparisons and achievements
- Podium displays for top performers
- Real-time ranking updates via Socket.io

### 8. Discussion Forums

Engage with the community:

- Create and browse discussion threads
- Comment and reply with nested discussions
- Upvote valuable content and solutions
- Follow interesting topics for updates
- Real-time notifications on activity
- Topic-based organization
- User reputation and trust scores

### 9. Real-time Features (Socket.io Integration)

Live platform experience:

- Live contest tracking
- Real-time leaderboard updates
- Instant notifications for achievements
- Live session indicators
- Activity feed updates
- Challenge completion broadcasts

### 10. Admin Dashboard

Administrators can:

- Manage users with role-based access
- Create, edit, and delete badges
- Design and manage coding challenges
- Monitor platform analytics and metrics
- Moderate discussions and content
- View system logs and activity
- Configure platform-wide settings
- Track user engagement metrics

---

## 📝 Development Guide

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with TypeScript interfaces
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Structure**: One component per file
- **Imports**: Use absolute imports with `@/` alias where configured

### Tailwind CSS Best Practices

```jsx
// ✅ Good: Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  {/* Content here */}
</div>

// ❌ Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px' }}>
  {/* Content here */}
</div>

// ✅ Good: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content here */}
</div>

// ✅ Good: Use Tailwind merge for class composition
import { cn } from "@/utils/cn";
const buttonClass = cn(baseClass, condition && activeClass);
```

### Component Structure

```tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { fetchData } from "@/services/api";

interface ComponentProps {
    title: string;
    onClose?: () => void;
}

export default function MyComponent({ title, onClose }: ComponentProps) {
    const [data, setData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchData();
            setData(result);
        };
        loadData();
    }, []);

    return (
        <div className="p-4">
            <h1>{title}</h1>
            {/* Component JSX */}
        </div>
    );
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🚢 Deployment

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### 2. Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

#### 3. GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json
"scripts": {
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Production Checklist

- [ ] Update `VITE_API_BASE_URL` to production API
- [ ] Update `VITE_SOCKET_IO_URL` to production Socket.io server
- [ ] Set `VITE_NODE_ENV=production`
- [ ] Enable analytics (if configured)
- [ ] Configure CDN for assets
- [ ] Set up error monitoring (Sentry)
- [ ] Enable HTTPS (required for speech features)
- [ ] Configure proper CORS headers
- [ ] Optimize images and assets
- [ ] Test on multiple devices/browsers
- [ ] Set up CI/CD pipeline

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
4. **Commit with descriptive messages**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open a Pull Request**

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Code Review Process

- All PRs require at least one approval
- Ensure all tests pass
- Follow the existing code style
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Error: Port 5173 is already in use
# Solution: Kill the process or use a different port
npm run dev -- --port 3000
```

#### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

#### TypeScript Errors

```bash
# Run type checking
npm run type-check

# Clear TypeScript cache
rm -rf tsconfig.tsbuildinfo
```

#### Socket.io Connection Issues

**Problem:** Real-time features not updating (leaderboard, contests)

**Solutions:**
```bash
# Ensure backend Socket.io server is running
# Check VITE_SOCKET_IO_URL in .env file
# Verify CORS settings on backend
# Clear browser cache and retry
# Check browser console for connection errors
```

#### Speech Recognition Not Working

**Problem:** Speech input in mock interviews fails

**Solutions:**
- Ensure HTTPS is enabled (required for production)
- Check microphone permissions in browser
- Verify `VITE_ENABLE_SPEECH_RECOGNITION=true` in .env
- Test in a supported browser (Chrome, Edge, Safari)
- Check browser console for security errors

#### AI Assistant Not Loading

**Problem:** AI Assistant panel doesn't appear in challenge solver

**Solutions:**
```bash
# Check VITE_ENABLE_AI_ASSISTANT=true in .env
# Verify backend AI service is running
# Check network requests in browser DevTools
# Ensure API base URL is correct
```

#### Interview Features Disabled

**Problem:** Mock interview page shows disabled message

**Solutions:**
```bash
# Enable in .env file:
VITE_ENABLE_MOCK_INTERVIEWS=true

# Restart development server
npm run dev
```

---

## 📚 API Integration

### Interview Service

```typescript
// Start interview
import { startMockInterview } from "@/services/interview";
const response = await startMockInterview("React.js", "Intermediate");

// Send answer
import { sendInterviewReply } from "@/services/interview";
const reply = await sendInterviewReply(interviewId, userAnswer);
```

### Challenge Service

```typescript
// Run code
import { runChallengeCode } from "@/services/challenge";
const results = await runChallengeCode({
    challengeId,
    language: "python",
    code: userCode
});

// Get hint
import { getChallengeHint } from "@/services/challenge";
const hint = await getChallengeHint(challengeId, code, language);
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

### Getting Help

- 📧 **Email**: sachinthaprabhashana2003@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Sachintha-Prabashana/skillbadge-frontend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Sachintha-Prabashana/skillbadge-frontend/discussions)

---

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for React 19
- [Vite Team](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Socket.io](https://socket.io/) for real-time communication
- All contributors who helped shape this project

---

## 📊 Project Stats

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Last Updated](https://img.shields.io/badge/last%20updated-Feb%202026-blue)

---

<div align="center">

**Built with ❤️ by the Skill Badge Platform Team**

[⬆ Back to Top](#skill-badge-platform-frontend)

</div>

