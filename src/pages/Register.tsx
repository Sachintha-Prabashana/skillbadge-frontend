import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Github, Linkedin } from "lucide-react"
import { register } from "../services/auth"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  // --- BEST PRACTICE: Generic Change Handler ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,       // Spread previous state so we don't lose other fields
      [name]: value  // Dynamic key update
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Now you can send 'formData' directly to your API!
    console.log("Submitting:", formData)
    // Simulate API call

    try{
      const data =   await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      )
      alert("Registration successful! Please log in.")
      console.log(data)
      navigate("/login")
      
      // Optionally, redirect to login page

    }catch(err){
      console.log("Registration error: ", err)
      alert("An error occurred during registration. Please try again.")
    }
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="w-full max-w-[420px] mx-auto font-['Satoshi',_'Open_Sans',_sans-serif]">
      
      {/* --- Header --- */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-[28px] font-bold text-[#0e141e] mb-2">Sign up</h1>
        <p className="text-[15px] text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* --- Form Section (First) --- */}
      <form onSubmit={handleRegister} className="space-y-5">
        
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-bold text-[#0e141e] mb-2">First Name</label>
            <input
              type="text"
              name="firstName"// <--- MUST MATCH state key
              value={formData.firstName}// <--- Controlled input
              onChange={handleChange}// <--- Generic handler
              placeholder="John"
              required
              className="w-full h-11 px-3 bg-white border border-[#b7c0cd] rounded text-[14px] text-[#0e141e] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-[#0e141e] mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="w-full h-11 px-3 bg-white border border-[#b7c0cd] rounded text-[14px] text-[#0e141e] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[14px] font-bold text-[#0e141e] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="w-full h-11 px-3 bg-white border border-[#b7c0cd] rounded text-[14px] text-[#0e141e] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[14px] font-bold text-[#0e141e] mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}// <--- Generic handler
              placeholder="Your password"
              required
              className="w-full h-11 px-3 pr-10 bg-white border border-[#b7c0cd] rounded text-[14px] text-[#0e141e] placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="mt-2 text-[12px] text-gray-500">
            Must be at least 8 characters long.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-[14px] transition-all shadow-sm"
        >
          {isLoading ? "Creating account..." : "Create an account"}
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

      {/* --- Social Login (Bottom) --- */}
      <div className="grid gap-3 mb-6">
        <button className="flex items-center justify-center gap-3 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 transition-colors text-[#0e141e] font-bold text-[14px]">
          <GoogleIcon className="w-5 h-5" />
          <span>Sign up with Google</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 transition-colors text-[#0e141e] font-bold text-[14px]">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
           </button>
           <button className="flex items-center justify-center gap-2 w-full h-11 bg-white border border-[#b7c0cd] rounded hover:bg-gray-50 transition-colors text-[#0e141e] font-bold text-[14px]">
            <Linkedin className="w-5 h-5 text-[#0a66c2]" />
            <span>LinkedIn</span>
           </button>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-6 text-center text-[13px] text-gray-500">
        By signing up, you agree to the 
        <a href="#" className="text-indigo-600 hover:underline"> Terms of Service</a> and 
        <a href="#" className="text-indigo-600 hover:underline"> Privacy Policy</a>.
      </div>
    </div>
  )
}

// Google Icon Component
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