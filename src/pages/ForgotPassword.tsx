import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"; // Added ExternalLink
import { useToast } from "../context/ToastContext";
import { forgotPassword } from "../services/auth";
import Logo from "../components/Logo";

export default function ForgotPassword() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
      setError("Unable to send email. Please try again later.");
      showToast("Something went wrong.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  //  SMART EMAIL LINK LOGIC
  const getEmailProviderLink = (email: string) => {
    const domain = email.split("@")[1];

    if (domain?.includes("gmail")) return "https://mail.google.com/";
    if (domain?.includes("outlook") || domain?.includes("hotmail") || domain?.includes("live")) return "https://outlook.live.com/";
    if (domain?.includes("yahoo")) return "https://mail.yahoo.com/";
    if (domain?.includes("proton")) return "https://mail.proton.me/";
    if (domain?.includes("icloud")) return "https://www.icloud.com/mail";
    
    // Fallback for corporate/unknown emails
    return `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',_sans-serif] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Nav: Back to Login */}
      <div className="absolute top-8 left-8 z-10">
        <Link to="/login" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0E141E] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
        
        <div className="flex justify-center mb-8">
            <Link to="/">
                <Logo theme="light" />
            </Link>
        </div>

        <div className="bg-white py-10 px-6 sm:px-10">
          
          {!isSubmitted ? (
            /* --- STATE 1: INPUT FORM --- */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-[#0E141E] mb-2 tracking-tight uppercase">
                  Reset Password
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  Enter your email and we'll send you instructions.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-left">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#0E141E] transition-colors" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="block w-full h-12 pl-10 pr-3 rounded-lg border border-slate-300 placeholder-slate-400 text-[#0E141E] font-medium focus:border-[#0E141E] focus:ring-1 focus:ring-[#0E141E] outline-none transition-all sm:text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#0E141E] hover:bg-slate-800 text-white font-bold rounded-lg text-sm tracking-wide transition-all shadow-lg shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed uppercase"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
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
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-6 border border-slate-200">
                <CheckCircle2 className="h-8 w-8 text-[#0E141E]" />
              </div>
              <h2 className="text-2xl font-black text-[#0E141E] mb-3 uppercase tracking-tight">Check your email</h2>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                We have sent a password reset link to <br/>
                <span className="font-bold text-[#0E141E]">{email}</span>
              </p>
              
              <div className="space-y-4">
                
                {/*  SMART BUTTON: OPENS GMAIL/OUTLOOK WEB DIRECTLY */}
                <a 
                   href={getEmailProviderLink(email)}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full h-12 flex items-center justify-center gap-2 bg-[#0E141E] hover:bg-slate-800 text-white font-bold rounded-lg text-sm tracking-wide transition-all uppercase shadow-lg shadow-slate-900/10"
                >
                  <span>Open {email.includes("gmail") ? "Gmail" : "Email App"}</span>
                  {/* Show external link icon if it's a website, not mailto */}
                  {!getEmailProviderLink(email).startsWith("mailto") && <ExternalLink className="w-4 h-4" />}
                </a>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="block w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0E141E] hover:bg-slate-50 transition-colors"
                >
                  Try another email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}