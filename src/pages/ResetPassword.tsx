import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { resetPassword } from "../services/auth"; // Import your service
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
      
      // Optional: Delay redirect slightly for UX
      setTimeout(() => navigate("/login"), 1000);

    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || "Link expired or invalid.";
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Satoshi',_sans-serif] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
            <Link to="/">
                <Logo className="w-12 h-12" textClassName="text-2xl" />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
                Set new password
            </h2>
            <p className="mt-2 text-sm text-slate-500">
                Your new password must be different from previous used passwords.
            </p>
        </div>

        {/* Card */}
        <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/60 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* New Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({...passwords, newPass: e.target.value})}
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="block w-full h-12 pl-10 pr-10 rounded-lg border border-slate-300 placeholder-slate-400 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Hint */}
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${passwords.newPass.length >= 8 ? "bg-green-500" : "bg-slate-300"}`} />
                <p className="text-xs text-slate-500">Must be at least 8 characters</p>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className={`h-5 w-5 transition-colors ${
                      passwords.confirmPass && passwords.newPass === passwords.confirmPass 
                        ? "text-green-500" 
                        : "text-slate-400 group-focus-within:text-indigo-500"
                  }`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.confirmPass}
                  onChange={(e) => setPasswords({...passwords, confirmPass: e.target.value})}
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`block w-full h-12 pl-10 pr-10 rounded-lg border placeholder-slate-400 text-slate-900 outline-none transition-all sm:text-sm focus:ring-2 ${
                    passwords.confirmPass && passwords.newPass !== passwords.confirmPass
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                />
              </div>
              {passwords.confirmPass && passwords.newPass !== passwords.confirmPass && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:shadow-md"
            >
              {isLoading ? (
                  <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Resetting Password...
                  </span>
              ) : (
                  "Reset Password"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8">
             <div className="relative flex justify-center text-sm">
                <Link to="/login" className="flex items-center gap-2 font-bold text-slate-500 hover:text-slate-900 transition-colors group">
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