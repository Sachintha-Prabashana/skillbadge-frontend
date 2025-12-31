import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { login, fetchProfile } from "../services/auth"
import { useAuth } from "../context/authContext"
import SocialLogin from "../components/SocialLogin.tsx";
import {useToast} from "../context/ToastContext.tsx";

export default function Login() {
    const { showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

      if (!email.trim() || !password.trim()) {
          showToast("Please enter both email and password.", "warning");
          return;
      }
    setIsLoading(true)
    // Simulate API call

    if (!email.trim() || !password.trim()) {
      alert("please enter both username and password.")
      return
    }

    try {
      const data = await login(email, password)

      if (data?.data?.accessToken) {
        await localStorage.setItem("accessToken", data.data.accessToken)
        await localStorage.setItem("refreshToken", data.data.refreshToken)

        const resData = await fetchProfile()
          console.log(resData.data)
          const currentUser = resData.data


        setUser(currentUser)
          showToast(`Welcome back, ${currentUser.firstname}!`, "success")
        console.log("loggin Success: ", currentUser)


          if (currentUser.roles && currentUser.roles.includes("ADMIN")){
              navigate("/admin/dashboard")
          }else {
              // Default fall-back is the Student Dashboard
              navigate("/dashboard");
          }
      }else {
          showToast("Login failed. Please check your credentials.", "error")
      }


    }catch (err: any) {
        console.error("Login error: ", err);

        // ---  ROBUST ERROR HANDLING  ---
        const data = err.response?.data;
        const status = err.response?.status;

        //  HANDLING THE SPECIFIC ERRORS

        // Case A: User Not Found / Wrong Password (Status 400)
        // This handles the "if (!existingUser)" check from your backend
        if (status === 400) {
            // "Invalid email or password" comes from data.message
            showToast(data?.message || "Invalid credentials.", "error");
        }

        // Case B: Banned User (Status 403)
        else if (status === 403) {
            showToast("Access Denied: Your account has been suspended.", "error");
        }

        // Case C: Social Login Attempt (Status 400 + specific code)
        else if (data?.error_code === "SOCIAL_LOGIN") {
            showToast("⚠️ This account uses Google.", "info");
            showToast("Please use the Google button below.", "info");
        }

        // Case D: Server Crash / Network Error (Status 500 or no status)
        else {
            showToast("Something went wrong. Please try again later.", "error");
        }
    }
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="w-full max-w-[420px] mx-auto font-['Satoshi',_'Open_Sans',_sans-serif]">
      
      {/* --- Header --- */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-[28px] font-bold text-[#0e141e] mb-2 tracking-tight">Log in</h2>
        <div className="text-[15px] text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-indigo-600 hover:underline transition-all">
            Sign up
          </Link>
        </div>
      </div>

      {/* --- Main Form --- */}
      <form onSubmit={handleLogin} className="space-y-6" noValidate>
        
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-[14px] font-bold text-[#0e141e]">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Your email"
            required
            className="w-full h-11 px-3 bg-white border border-[#b7c0cd] rounded text-[14px] text-[#0e141e] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all shadow-sm hover:border-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="block text-[14px] font-bold text-[#0e141e]">
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Your password"
              required
              className="w-full h-11 px-3 pr-10 bg-white border border-[#b7c0cd] rounded text-[14px] text-[#0e141e] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all shadow-sm hover:border-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded text-[14px] transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

      </form>

      {/* --- Divider --- */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#dce1e9]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500 font-medium">OR</span>
        </div>
      </div>

        {/* --- Social Login Component --- */}
        <SocialLogin mode="login"/>

      {/* --- Social Login (Now at Bottom) --- */}
      {/*<div className="grid gap-3">*/}
      {/*  <button className="flex items-center justify-center gap-3 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-[#0e141e] font-bold text-[14px] shadow-sm group">*/}
      {/*    <GoogleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />*/}
      {/*    <span>Log in with Google</span>*/}
      {/*  </button>*/}
      {/*  */}
      {/*  <div className="grid grid-cols-2 gap-3">*/}
      {/*     <button className="flex items-center justify-center gap-2 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-[#0e141e] font-bold text-[14px] shadow-sm group">*/}
      {/*      <Github className="w-5 h-5 text-[#24292f] group-hover:scale-105 transition-transform" />*/}
      {/*      <span>GitHub</span>*/}
      {/*     </button>*/}
      {/*     <button className="flex items-center justify-center gap-2 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-[#0e141e] font-bold text-[14px] shadow-sm group">*/}
      {/*      <Linkedin className="w-5 h-5 text-[#0a66c2] group-hover:scale-105 transition-transform" />*/}
      {/*      <span>LinkedIn</span>*/}
      {/*     </button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* --- Footer Agreement --- */}
      <div className="mt-8 text-center text-[13px] text-gray-500 leading-relaxed">
         This site is protected by reCAPTCHA and the Google 
         <a href="#" className="text-indigo-600 hover:underline ml-1">Privacy Policy</a> and 
         <a href="#" className="text-indigo-600 hover:underline ml-1">Terms of Service</a> apply.
      </div>

    </div>
  )

}