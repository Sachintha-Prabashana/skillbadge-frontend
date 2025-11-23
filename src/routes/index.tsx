import { lazy, Suspense, type ReactNode} from "react"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"

import { useAuth } from "../context/authContext"

import MarketingLayout from "../Layouts/MarketingLayout"
import AuthLayout from "../Layouts/AuthLayout"
import Home from "../pages/Home"

const Index = lazy(() => import("../pages/Index"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))


// login ekai register ekai wenvd kiyl mulin blnne . layout header onna
export default function Router() {
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
          {/* --- Layout Routes (Pages with Header & Footer) --- */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Index />} />
          </Route>
          <Route element={<AuthLayout />}>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
          </Route>

          {/* --- Dashboard Routes --- */}
          <Route path="/home" element={<Home />} />

        </Routes>

      </Suspense>
    
    </BrowserRouter>
     
  )
}
