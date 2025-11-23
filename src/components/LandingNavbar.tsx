import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code2, Menu, X } from "lucide-react";

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
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            SkillBadge
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it Works", "Community"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all hover:shadow-lg hover:shadow-indigo-600/20"
          >
            Join Free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl">
          <a href="#features" className="text-slate-600 font-medium">Features</a>
          <a href="#how-it-works" className="text-slate-600 font-medium">How it Works</a>
          <a href="#community" className="text-slate-600 font-medium">Community</a>
          <hr className="border-slate-100" />
          <Link to="/login" className="text-slate-600 font-medium">Sign In</Link>
          <Link to="/register" className="bg-indigo-600 text-white py-3 rounded-lg text-center font-bold">
            Join Free
          </Link>
        </div>
      )}
    </nav>
  );
}