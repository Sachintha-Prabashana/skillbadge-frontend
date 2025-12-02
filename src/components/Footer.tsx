import { Link } from "react-router-dom";
import { Code2, Terminal, Github, Twitter, Linkedin, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0e141e] border-t border-slate-800 pt-16 pb-8 font-['Satoshi',_sans-serif]">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- MAIN FOOTER CONTENT --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand & Mission */}
                    <div className="md:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            {/* Mini Logo Match */}
                            <div className="relative w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Terminal className="absolute w-4 h-4 text-indigo-200/50 top-1 left-1" />
                                <Code2 className="absolute w-4 h-4 text-white bottom-1.5 right-1.5" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">SkillBadge</span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            The open-source platform for developers to master algorithms, build portfolios,
                            and prove their skills through real-world challenges.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <SocialIcon icon={Github} href="https://github.com" label="GitHub" />
                            <SocialIcon icon={Twitter} href="https://twitter.com" label="Twitter" />
                            <SocialIcon icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
                        </div>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/challenges" className="hover:text-indigo-400 transition-colors">Browse Challenges</Link></li>
                            <li><Link to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</Link></li>
                            <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pro Pricing</Link></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">API Docs</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                            <li><a href="mailto:support@skillbadge.com" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                            <li><span className="text-emerald-500 text-xs font-bold border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded-full">Systems Operational</span></li>
                        </ul>
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-500 text-xs">
                        © 2025 SkillBadge. Open Source & Free Forever.
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                        <span>Built with</span>
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                        <span>by You in Sri Lanka</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

// Helper Component for Social Icons
function SocialIcon({ icon: Icon, href, label }: any) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-110"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}