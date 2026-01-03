import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { forgotPassword } from "../services/auth"; // Import your service
import Logo from "../components/Logo";

export default function ForgotPassword() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Local error state for immediate feedback

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      showToast("Reset link sent successfully.", "success");
    } catch (err: any) {
      console.error(err);
      // UX Decision: Even if email not found, generic error or success is safer security-wise.
      // But for UX clarity, we often show a gentle error if something actually broke (500).
      setError("Unable to send email. Please try again later.");
      showToast("Something went wrong.", "error");
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

      {/* Nav: Back to Login */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
            <Link to="/">
                <Logo className="w-12 h-12" textClassName="text-2xl" />
            </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/60 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {!isSubmitted ? (
            /* --- STATE 1: INPUT FORM --- */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Reset password
                </h2>
                <p className="mt-2 text-slate-500 text-sm">
                  Enter your email and we'll send you instructions to reset your password.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="block w-full h-12 pl-10 pr-3 rounded-lg border border-slate-300 placeholder-slate-400 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all sm:text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* --- STATE 2: SUCCESS MESSAGE --- */
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-6 border border-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Check your email</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                We have sent a password reset link to <br/>
                <span className="font-bold text-slate-900">{email}</span>
              </p>
              
              <div className="space-y-4">
                <a 
                   href={`mailto:${email}`}
                   className="block w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:shadow-md"
                >
                  Open Email App
                </a>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="block w-full py-3 px-4 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Click to try another email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}