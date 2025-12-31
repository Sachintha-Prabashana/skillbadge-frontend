import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { register } from "../services/auth"
import SocialLogin from "../components/SocialLogin.tsx";

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
        <SocialLogin mode="register" />

      {/* Footer Text */}
      <div className="mt-6 text-center text-[13px] text-gray-500">
        By signing up, you agree to the 
        <a href="#" className="text-indigo-600 hover:underline"> Terms of Service</a> and 
        <a href="#" className="text-indigo-600 hover:underline"> Privacy Policy</a>.
      </div>
    </div>
  )

}