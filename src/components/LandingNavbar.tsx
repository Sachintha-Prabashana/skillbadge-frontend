import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code2, Terminal, Menu, X, ArrowRight } from "lucide-react";

export default function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Effect to handle scroll state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                isScrolled
                    ? "bg-[#0e141e]/90 backdrop-blur-lg border-slate-800 py-4 shadow-xl shadow-black/10"
                    : "bg-transparent border-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* --- 1. NEW COMPOSITE LOGO --- */}
                <Link to="/" className="flex items-center gap-3 group">
                    {/* Icon Container with Layered Effect */}
                    <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                        {/* Icon 1: Terminal (Background) */}
                        <Terminal className="absolute w-5 h-5 text-indigo-200/50 top-1.5 left-1.5" />
                        {/* Icon 2: Code (Foreground) */}
                        <Code2 className="absolute w-5 h-5 text-white bottom-2 right-2" />
                    </div>

                    <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">
              SkillBadge
            </span>
                        <span className="text-[10px] font-medium text-indigo-400 tracking-wide uppercase">
              Dev Platform
            </span>
                    </div>
                </Link>

                {/* --- 2. DESKTOP NAVIGATION (Dev Style) --- */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Challenges", "Community"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-slate-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* --- 3. ACTION BUTTONS --- */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="group relative inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold overflow-hidden hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />

                        <span className="relative">Join Free</span>
                        <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-white transition"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* --- 4. MOBILE DROPDOWN (Dark Theme) --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#0e141e] border-b border-slate-800 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
                    <a href="#features" className="text-slate-300 hover:text-indigo-400 font-medium py-2">Features</a>
                    <a href="#challenges" className="text-slate-300 hover:text-indigo-400 font-medium py-2">Challenges</a>
                    <a href="#community" className="text-slate-300 hover:text-indigo-400 font-medium py-2">Community</a>
                    <div className="h-px bg-slate-800 my-2" />
                    <Link to="/login" className="text-slate-300 hover:text-white font-medium py-2">Sign In</Link>
                    <Link to="/register" className="bg-indigo-600 text-white py-3 rounded-xl text-center font-bold shadow-lg shadow-indigo-900/20">
                        Start Coding Now
                    </Link>
                </div>
            )}
        </nav>
    );
}