import { lazy, Suspense} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// import { useAuth } from "../context/authContext"

import MarketingLayout from "../Layouts/MarketingLayout"
import AuthLayout from "../Layouts/AuthLayout"
import AdminLayout from "../Layouts/AdminLayout.tsx"
import DashboardLayout from "../Layouts/DashboardLayout.tsx"
import Leaderboard from "../pages/Leaderboard.tsx"
import Profile from "../pages/Profile.tsx"

const Index = lazy(() => import("../pages/Index"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Challenge = lazy(() => import("../pages/admin/./ManageChallenges"))
const Home = lazy(() => import("../pages/Home"))

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"))
const ManageUsers = lazy(() => import("../pages/admin/ManageUsers"))
const Settings = lazy(() => import("../pages/admin/settings"))
const CreateChallenge = lazy(() => import("../pages/admin/CreateChallenge"))
const ChallengeSolver = lazy(() => import("../pages/ChallengeSolver"))
const AuthSuccess = lazy(() => import("../pages/AuthSuccess"))
const ProfileSettings = lazy(() => import("../pages/ProfileSettings.tsx"))
const ContestLive = lazy(() => import("../components/ContestLive.tsx"));
const Discuss = lazy(() => import("../pages/Discuss.tsx"));
const PostDetails = lazy(() => import("../pages/PostDetails.tsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.tsx"));

// login ekai register ekai wenvd kiyl mulin blnne . layout header onna
export default function Router() {
  // @ts-ignore
    // @ts-ignore
    return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Index />} />
          </Route>
          <Route element={<AuthLayout />}>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
          </Route>

          {/* --- Dashboard Routes  for Admin --- */}

            <Route path="/admin" element={<AdminLayout />} >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="challenge" element={<Challenge/>} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="settings" element={<Settings />} />
                <Route path="challenges/new" element={<CreateChallenge />} />

            </Route>

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Home />}></Route>
                <Route path="/leaderboard" element={<Leaderboard />} />

                {/* Matches /profile (me) AND /profile/123 (others) */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile/me/settings" element={<ProfileSettings />} />
                <Route path="/contest/live" element={<ContestLive />}/>
                <Route path="/discuss" element={<Discuss />} />
                <Route path="/discuss/:id" element={<PostDetails />} />


            </Route>
            {/* --- STANDALONE PAGE (No Sidebar) --- */}
            {/* This matches the /challenges/:id link from the dashboard */}
            <Route path="/challenges/:id" element={<ChallengeSolver />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />



        </Routes>
      </Suspense>
    </BrowserRouter>
     
  )
}
