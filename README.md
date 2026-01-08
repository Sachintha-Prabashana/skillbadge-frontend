# Skill Badge Platform Frontend

> A modern, interactive web application for skill verification, coding challenges, and professional development with gamification features, built with React 19 and TypeScript.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

| **Frontend** | 🟢 **Live** | [**Click here to visit App**](https://skillbadge-frontend.vercel.app) | Vercel |
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
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

The **Skill Badge Platform Frontend** is a comprehensive web application that enables users to showcase their skills, complete coding challenges, earn badges, and compete on leaderboards. Built with cutting-edge technologies including React 19, TypeScript, and Vite, the platform provides an engaging, gamified learning experience.

### What Makes This Special

- **🎮 Gamification**: Badge system, leaderboards, and achievement tracking
- **💻 Interactive Coding Challenges**: Built-in code editor with real-time validation
- **👥 Social Features**: Discussion forums, user profiles, and community engagement
- **🎨 Modern UI/UX**: Responsive design with Tailwind CSS and Framer Motion animations
- **🔐 Secure Authentication**: OAuth integration (Google, GitHub) and JWT-based auth
- **📊 Admin Dashboard**: Comprehensive management tools for platform administrators
- **⚡ Lightning Fast**: Powered by Vite for instant hot module replacement (HMR)

---

## ✨ Features

### 🎓 Learning & Development

- **Skill Badges**: Earn and display badges for completed skills and achievements
- **Coding Challenges**: Interactive programming challenges with multiple difficulty levels
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Skill Categories**: Organized learning paths across various technologies

### 🏆 Gamification

- **Badge System**: Unlock badges by completing challenges and milestones
- **Leaderboards**: Compete globally or within specific categories
- **Achievement System**: Track accomplishments and showcase expertise
- **Points & Rewards**: Earn points for participation and skill mastery

### 👨‍💼 User Experience

- **Personalized Dashboard**: Customized view based on user role (Admin, Instructor, Student)
- **User Profiles**: Showcase badges, achievements, and activity history
- **Social Interaction**: Discuss topics, share knowledge, and collaborate
- **Real-time Notifications**: Stay updated on challenges, badges, and community activity

### 🛠️ Admin Capabilities

- **User Management**: Comprehensive user administration tools
- **Badge Management**: Create, edit, and assign badges
- **Challenge Creation**: Build and manage coding challenges
- **Analytics Dashboard**: Monitor platform metrics and user engagement
- **Content Moderation**: Review and manage discussions and submissions

### 💻 Technical Features

- **OAuth Authentication**: Seamless login with Google and GitHub
- **Code Editor Integration**: Syntax highlighting and code execution
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Eye-friendly interface for extended usage
- **File Upload**: Profile pictures and challenge submissions
- **Real-time Updates**: Live data synchronization

---

## 🛠️ Tech Stack

### Core Technologies

- **[React 19.0.0](https://react.dev/)** - Latest React with modern features
- **[TypeScript 5.6+](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 6.0+](https://vitejs.dev/)** - Next-generation frontend tooling
- **[React Router DOM 7.1](https://reactrouter.com/)** - Client-side routing

### UI & Styling

- **[Tailwind CSS 3.4+](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.0+](https://www.framer.com/motion/)** - Advanced animations
- **[Lucide React 0.468](https://lucide.dev/)** - Beautiful icon library
- **[React Icons 5.4](https://react-icons.github.io/react-icons/)** - Additional icon sets

### State Management & Data

- **React Context API** - Global state management
- **[Axios 1.7+](https://axios-http.com/)** - HTTP client
- **LocalStorage** - Persistent client-side data

### Code Editor

- **[@monaco-editor/react 4.7](https://microsoft.github.io/monaco-editor/)** - VS Code's editor in the browser

### Form Handling

- **[React Hook Form 7.54](https://react-hook-form.com/)** - Performant form validation

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS transformations
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

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
│   ├── components/            # Reusable React components
│   │   ├── AdminSidebar.tsx
│   │   ├── AiAssistant.tsx
│   │   ├── BadgesSection.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── ContestLive.tsx
│   │   ├── DashboardFeatureCards.tsx
│   │   ├── EducationSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeatmapSection.tsx
│   │   ├── LandingNavbar.tsx
│   │   ├── Logo.tsx
│   │   ├── PodiumCard.tsx
│   │   ├── ProfileSidebar.tsx
│   │   ├── ProgressSection.tsx
│   │   ├── RecentActivitySection.tsx
│   │   ├── Slidebar.tsx
│   │   ├── SocialButton.tsx
│   │   ├── SocialLogin.tsx
│   │   ├── SolverHeader.tsx
│   │   ├── StatRow.tsx
│   │   └── SuccessModal.tsx
│   │
│   ├── context/              # React Context providers
│   │   ├── authContext.tsx   # Authentication state management
│   │   ├── SidebarContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── Layouts/              # Page layout components
│   │   ├── AdminLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── MarketingLayout.tsx
│   │
│   ├── pages/                # Route-level components
│   │   ├── admin/
│   │   ├── AuthSuccess.tsx
│   │   ├── ChallengeSolver.tsx
│   │   ├── Discuss.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Home.tsx
│   │   ├── Index.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Login.tsx
│   │   ├── MyLists.tsx
│   │   ├── PostDetails.tsx
│   │   ├── Profile.tsx
│   │   ├── ProfileSettings.tsx
│   │   ├── Register.tsx
│   │   └── ResetPassword.tsx
│   │
│   ├── routes/              # Routing configuration
│   │   └── index.tsx
│   │
│   ├── services/            # API service layer
│   │   ├── admin/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── challenge.ts
│   │   └── discuss.ts
│   │
│   ├── App.css
│   ├── App.tsx              # Root application component
│   ├── index.css            # Global CSS with Tailwind imports
│   ├── main.tsx             # Application entry point
│   └── socket.ts            # Socket.io configuration
│
├── utils/                   # Utility functions
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app configuration
├── tsconfig.node.json      # TypeScript node configuration
├── vite.config.ts          # Vite configuration
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
git clone https://github.com/your-username/skill-badge-platform-frontend.git
cd skill-badge-platform-frontend
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

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_ANALYTICS=false

# Upload Configuration
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Code Editor Configuration
VITE_MONACO_THEME=vs-dark
VITE_CODE_EXECUTION_TIMEOUT=5000

# Environment
VITE_NODE_ENV=development
```

### Important Notes

- All environment variables in Vite **must be prefixed with `VITE_`** to be accessible in the client
- The `VITE_API_BASE_URL` should point to your running backend server
- Never commit the `.env` file to version control
- For production, update URLs and disable debug features

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

# Type check
npm run type-check

# Format code (if Prettier is configured)
npm run format
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

### 2. Badge System

Users can:

- Browse available badges by category
- View badge requirements and criteria
- Track progress toward earning badges
- Display earned badges on their profile
- Share achievements on social media

### 3. Coding Challenges

Features:

- Monaco Editor integration (VS Code engine)
- Multiple programming languages support
- Real-time code execution
- Test case validation
- Difficulty levels (Easy, Medium, Hard)
- Solution submission and review

### 4. Leaderboard System

Track rankings by:

- Overall points
- Category-specific achievements
- Weekly/Monthly/All-time periods
- Friend comparisons
- Team competitions

### 5. Discussion Forums

Engage with the community:

- Create discussion threads
- Comment and reply
- Upvote valuable content
- Follow interesting topics
- Get notifications on activity

### 6. Admin Dashboard

Administrators can:

- Manage users (view, edit, delete)
- Create and manage badges
- Design coding challenges
- Monitor platform analytics
- Moderate discussions
- View system logs

---

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with TypeScript interfaces
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Structure**: One component per file
- **Imports**: Use absolute imports with `@/` alias

### Tailwind CSS Best Practices

```typescript
// ✅ Good: Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ❌ Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px' }}>

// ✅ Good: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
- [ ] Set `VITE_NODE_ENV=production`
- [ ] Enable analytics (if configured)
- [ ] Configure CDN for assets
- [ ] Set up error monitoring (Sentry)
- [ ] Enable HTTPS
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


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support


### Contact

- 📧 Email: sachinthaprabhashana2003@gmail.com

---

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for React 19
- [Vite Team](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- All contributors who helped shape this project

---

## 📊 Project Stats

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

<div align="center">

**Built with ❤️ by the Skill Badge Platform Team**

[⬆ Back to Top](#skill-badge-platform-frontend)

</div>
