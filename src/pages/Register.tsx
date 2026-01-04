import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { register } from "../services/auth";
import SocialLogin from "../components/SocialLogin";
import { useToast } from "../context/ToastContext"; // <--- 1. Import Toast Context

export default function Register() {
  const { showToast } = useToast(); // <--- 2. Initialize Hook
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      // ✅ 3. Success Toast
      showToast("Registration successful! Please log in.", "success");
      
      // Slight delay to let user read the toast before redirecting
      setTimeout(() => navigate("/login"), 1000);

    } catch (err: any) {
      console.error("Registration error: ", err);
      
      // ✅ 4. Error Toast (captures backend error message if available)
      const errorMessage = err.response?.data?.message || "An error occurred during registration.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto font-['Satoshi',_sans-serif]">
      
      {/* --- Header --- */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-[#0E141E] mb-2 tracking-tight uppercase">Create Account</h1>
        <p className="text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#0E141E] hover:underline transition-all">
            Log in
          </Link>
        </p>
      </div>

      {/* --- Form Section --- */}
      <form onSubmit={handleRegister} className="space-y-5">
        
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-[#0E141E] placeholder:text-slate-400 focus:outline-none focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-[#0E141E] placeholder:text-slate-400 focus:outline-none focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
            className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-[#0E141E] placeholder:text-slate-400 focus:outline-none focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full h-12 px-4 pr-10 bg-white border border-slate-300 rounded-lg text-sm font-medium text-[#0E141E] placeholder:text-slate-400 focus:outline-none focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#0E141E] cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="mt-2 text-xs font-medium text-slate-400">
            Must be at least 8 characters long.
          </p>
        </div>

        {/* Submit Button (BLACK) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#0E141E] hover:bg-slate-800 text-white font-bold rounded-lg text-sm tracking-wide transition-all shadow-lg shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed uppercase"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* --- Divider --- */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
          <span className="px-3 bg-white text-slate-400">Or join with</span>
        </div>
      </div>

      {/* --- Social Login (Bottom) --- */}
      <SocialLogin mode="register" />

      {/* Footer Text */}
      <div className="mt-6 text-center text-xs text-slate-500 font-medium">
        By signing up, you agree to the 
        <a href="#" className="text-[#0E141E] hover:underline ml-1"> Terms of Service</a> and 
        <a href="#" className="text-[#0E141E] hover:underline ml-1"> Privacy Policy</a>.
      </div>
    </div>
  );
}