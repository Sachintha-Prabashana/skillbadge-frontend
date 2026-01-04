import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-[#F3F2F0]/90 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm"
                    : "bg-transparent border-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* --- 1. LOGO (Dark Text for Light Theme) --- */}
                <Link to="/" className="flex items-center gap-3 group">
                    <Logo theme="light" />
                </Link>

                {/* --- 2. DESKTOP NAVIGATION --- */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Pricing", "Blog", "Docs"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-[#0E141E] transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* --- 3. ACTION BUTTONS --- */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-xs font-bold uppercase tracking-wide text-[#0E141E] hover:text-indigo-600 transition-colors flex items-center gap-1"
                    >
                        Login <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                        to="/register"
                        className="h-10 px-6 flex items-center justify-center bg-[#0E141E] text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-[#0E141E]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* --- 4. MOBILE DROPDOWN --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#F3F2F0] border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
                    {["Features", "Pricing", "Blog", "Docs"].map((item) => (
                        <a key={item} href="#" className="text-sm font-bold uppercase text-slate-600 hover:text-[#0E141E]">
                            {item}
                        </a>
                    ))}
                    <div className="h-px bg-slate-300 my-2" />
                    <Link to="/login" className="text-sm font-bold uppercase text-[#0E141E]">Login</Link>
                    <Link to="/register" className="bg-[#0E141E] text-white py-3 text-center text-sm font-bold uppercase">
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}