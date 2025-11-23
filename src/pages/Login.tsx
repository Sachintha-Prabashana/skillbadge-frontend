import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Github, Linkedin } from "lucide-react"
import { login, fetchProfile } from "../services/auth"
import { useAuth } from "../context/authContext"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
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

        setUser(resData.data)
        console.log("loggin Success: ", resData.data)
        navigate("/home")
      }else {
        alert("Login failed, please check your credentials.")
      }


    }catch (err) {
      console.log("loggin error: ", err)
      alert("An error occurred during login. Please try again.")
    }
    setTimeout(() => setIsLoading(false), 2000)
  };

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
      <form onSubmit={handleLogin} className="space-y-6">
        
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

      {/* --- Social Login (Now at Bottom) --- */}
      <div className="grid gap-3">
        <button className="flex items-center justify-center gap-3 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-[#0e141e] font-bold text-[14px] shadow-sm group">
          <GoogleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
          <span>Log in with Google</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-[#0e141e] font-bold text-[14px] shadow-sm group">
            <Github className="w-5 h-5 text-[#24292f] group-hover:scale-105 transition-transform" />
            <span>GitHub</span>
           </button>
           <button className="flex items-center justify-center gap-2 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-[#0e141e] font-bold text-[14px] shadow-sm group">
            <Linkedin className="w-5 h-5 text-[#0a66c2] group-hover:scale-105 transition-transform" />
            <span>LinkedIn</span>
           </button>
        </div>
      </div>

      {/* --- Footer Agreement --- */}
      <div className="mt-8 text-center text-[13px] text-gray-500 leading-relaxed">
         This site is protected by reCAPTCHA and the Google 
         <a href="#" className="text-indigo-600 hover:underline ml-1">Privacy Policy</a> and 
         <a href="#" className="text-indigo-600 hover:underline ml-1">Terms of Service</a> apply.
      </div>

    </div>
  )
}

// Google SVG Icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}