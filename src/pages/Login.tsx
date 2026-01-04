import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { login, fetchProfile } from "../services/auth"
import { useAuth } from "../context/authContext"
import SocialLogin from "../components/SocialLogin";
import { useToast } from "../context/ToastContext";

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

    try {
      const data = await login(email, password)

      if (data?.data?.accessToken) {
        await localStorage.setItem("accessToken", data.data.accessToken)
        await localStorage.setItem("refreshToken", data.data.refreshToken)

        const resData = await fetchProfile()
        const currentUser = resData.data

        setUser(currentUser)
        showToast(`Welcome back, ${currentUser.firstname}!`, "success")

        if (currentUser.roles && currentUser.roles.includes("ADMIN")) {
          navigate("/admin/dashboard")
        } else {
          navigate("/dashboard");
        }
      } else {
        showToast("Login failed. Please check your credentials.", "error")
      }

    } catch (err: any) {
      console.error("Login error: ", err);
      const data = err.response?.data;
      const status = err.response?.status;

      if (status === 400) {
        showToast(data?.message || "Invalid credentials.", "error");
      } else if (status === 403) {
        showToast("Access Denied: Your account has been suspended.", "error");
      } else if (data?.error_code === "SOCIAL_LOGIN") {
        showToast("⚠️ This account uses Google.", "info");
      } else {
        showToast("Something went wrong. Please try again later.", "error");
      }
    }
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="w-full max-w-[420px] mx-auto font-['Satoshi',_sans-serif]">

      {/* --- Header --- */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-black text-[#0E141E] mb-2 tracking-tight uppercase">Log In</h2>
        <div className="text-sm font-medium text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-[#0E141E] hover:underline transition-all">
            Sign up
          </Link>
        </div>
      </div>

      {/* --- Main Form --- */}
      <form onSubmit={handleLogin} className="space-y-6" noValidate>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            placeholder="name@company.com"
            required
            className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-[#0E141E] placeholder:text-slate-400 focus:outline-none focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-slate-500 hover:text-[#0E141E] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              required
              className="w-full h-12 px-4 pr-10 bg-white border border-slate-300 rounded-lg text-sm font-medium text-[#0E141E] placeholder:text-slate-400 focus:outline-none focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#0E141E] cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button (BLACK BUTTON) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0E141E] hover:bg-slate-800 text-white font-bold rounded-lg text-sm tracking-wide transition-all shadow-lg shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed uppercase"
        >
          {isLoading ? "Authenticating..." : "Log In"}
        </button>

      </form>

      {/* --- Divider --- */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
          <span className="px-3 bg-white text-slate-400">Or continue with</span>
        </div>
      </div>

      {/* --- Social Login --- */}
      <SocialLogin mode="login" />

      {/* --- Footer Agreement --- */}
      <div className="mt-8 text-center text-xs text-slate-500 leading-relaxed font-medium">
        This site is protected by reCAPTCHA and the Google
        <a href="#" className="text-[#0E141E] hover:underline ml-1">Privacy Policy</a> and
        <a href="#" className="text-[#0E141E] hover:underline ml-1">Terms of Service</a> apply.
      </div>

    </div>
  )
}