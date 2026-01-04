import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { resetPassword } from "../services/auth";
import Logo from "../components/Logo";

export default function ResetPassword() {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [token, setToken] = useState("");
  const [passwords, setPasswords] = useState({ newPass: "", confirmPass: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validate on load
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
        showToast("Invalid or expired reset link.", "error");
        navigate("/login");
    } else {
        setToken(tokenFromUrl);
    }
  }, [searchParams, navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side Validation
    if (passwords.newPass.length < 8) {
        showToast("Password must be at least 8 characters long.", "warning");
        return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
        showToast("Passwords do not match.", "error");
        return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, passwords.newPass);
      showToast("Password reset successfully! Please log in.", "success");
      
      setTimeout(() => navigate("/login"), 1000);

    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to reset password.";
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',_sans-serif] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
            <Link to="/">
                <Logo theme="light" />
            </Link>
            <h2 className="mt-8 text-3xl font-black text-[#0E141E] tracking-tight uppercase">
                Set New Password
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500 text-center max-w-xs">
                Your new password must be different from previously used passwords.
            </p>
        </div>

        {/* Card */}
        <div className="bg-white py-10 px-6 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* New Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#0E141E] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({...passwords, newPass: e.target.value})}
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="block w-full h-12 pl-10 pr-10 rounded-lg border border-slate-300 placeholder-slate-400 text-[#0E141E] font-medium focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] outline-none transition-all sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#0E141E] cursor-pointer focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Hint */}
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${passwords.newPass.length >= 8 ? "bg-emerald-500" : "bg-slate-300"}`} />
                <p className="text-xs font-medium text-slate-500">Must be at least 8 characters</p>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className={`h-5 w-5 transition-colors ${
                      passwords.confirmPass && passwords.newPass === passwords.confirmPass 
                        ? "text-emerald-500" 
                        : "text-slate-400 group-focus-within:text-[#0E141E]"
                  }`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.confirmPass}
                  onChange={(e) => setPasswords({...passwords, confirmPass: e.target.value})}
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`block w-full h-12 pl-10 pr-10 rounded-lg border placeholder-slate-400 text-[#0E141E] font-medium outline-none transition-all sm:text-sm focus:ring-1 ${
                    passwords.confirmPass && passwords.newPass !== passwords.confirmPass
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-[#0E141E] focus:ring-[#0E141E]"
                  }`}
                />
              </div>
              {passwords.confirmPass && passwords.newPass !== passwords.confirmPass && (
                  <p className="mt-1 text-xs font-bold text-red-500">Passwords do not match</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center h-12 border border-transparent rounded-lg shadow-lg shadow-slate-900/10 text-sm font-bold text-white bg-[#0E141E] hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all uppercase tracking-wide"
            >
              {isLoading ? (
                  <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating...
                  </span>
              ) : (
                  "Reset Password"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8">
             <div className="relative flex justify-center text-sm">
                <Link to="/login" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0E141E] transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to log in
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}