import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-[#020408] border-t border-slate-800 pt-16 pb-12 font-['Satoshi',_sans-serif] relative z-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- MAIN FOOTER CONTENT --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand & Socials */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <Logo theme="dark" />
                        </Link>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            Validate skills, build portfolios, and prove mastery.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon icon={Github} href="https://github.com" label="GitHub" />
                            <SocialIcon icon={Twitter} href="https://twitter.com" label="Twitter" />
                            <SocialIcon icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
                        </div>
                    </div>

                    {/* Column 2: Platform */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-400">
                            <li><Link to="/challenges" className="hover:text-white transition-colors">Challenges</Link></li>
                            <li><Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
                            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Company</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-400">
                            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li>
                                <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold border border-emerald-900/50 bg-emerald-900/20 px-2 py-1 rounded-md mt-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Operational
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: CTA (NEW SIGN UP BUTTON) */}
                    <div className="flex flex-col items-start">
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Get Started</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Ready to prove your coding skills? Join 10,000+ developers today.
                        </p>
                        
                        {/* 👇 THE WHITE BUTTON (High Contrast on Black Footer) */}
                        <Link 
                            to="/register"
                            className="group flex items-center gap-2 bg-white text-[#0E141E] px-5 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-slate-200 transition-all w-full md:w-auto justify-center"
                        >
                            Sign Up Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wide">
                        © 2025 SkillBadge.
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wide">
                        <span>Powered by</span>
                        <span className="text-white">SPSolutions</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

// Helper for Social Icons
function SocialIcon({ icon: Icon, href, label }: any) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-9 h-9 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-500 hover:text-white transition-all"
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}