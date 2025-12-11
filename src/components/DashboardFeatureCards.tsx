import { Calendar, Flame, Trophy, ArrowRight, BookOpen, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardFeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            {/* 1. DAILY CHALLENGE (Retention) */}
            <Link to="/challenges/daily" className="group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                        <Flame className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                        +10 XP
                    </span>
                </div>
                <h3 className="text-white font-bold mb-1">Daily Challenge</h3>
                <p className="text-slate-400 text-xs mb-3">Keep your streak alive!</p>
                <div className="flex items-center text-xs font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
                    Solve Now <ArrowRight className="w-3 h-3 ml-1" />
                </div>
            </Link>

            {/* 2. CONTINUE LEARNING (Continuity) */}
            <Link to="/learn" className="group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <BookOpen className="w-5 h-5" />
                    </div>
                </div>
                <h3 className="text-white font-bold mb-1">SQL 50</h3>
                <p className="text-slate-400 text-xs mb-3">12/50 Problems Solved</p>

                {/* Mini Progress Bar */}
                <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[24%]"></div>
                </div>
            </Link>

            {/* 3. UPCOMING CONTEST (Urgency) */}
            <Link to="/contests" className="group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                        2d 4h
                    </span>
                </div>
                <h3 className="text-white font-bold mb-1">Weekly Contest</h3>
                <p className="text-slate-400 text-xs">Sunday, 10:00 AM</p>
            </Link>

            {/* 4. RANDOM PRACTICE (Quick Action) */}
            <button className="text-left group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                        <Shuffle className="w-5 h-5" />
                    </div>
                </div>
                <h3 className="text-white font-bold mb-1">Feeling Lucky?</h3>
                <p className="text-slate-400 text-xs">Pick a random hard problem</p>
            </button>

        </div>
    )
}