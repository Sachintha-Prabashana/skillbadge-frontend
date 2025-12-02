import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    ChevronDown,
    CheckCircle2,
    Circle,
    Lock,
    Flame,
    Gift,
    Search as SearchIcon,
    Image as ImageIcon,
    Loader2, ChevronLeft, ChevronRight // Added Loader icon
} from "lucide-react";
import { type Challenge, fetchChallenges } from "../services/challenge.ts";

export default function Home() {
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true) // Set loading to true before fetching
            try {
                const response = await fetchChallenges(page)
                setChallenges(response.data)
                setTotalPages(response.pagination.pages)
            } catch (err) {
                console.error("Error fetching challenges:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [page]);

    // Logic: First item is "Daily", rest are list
    const dailyChallenge = challenges.length > 0 ? challenges[0] : null;
    const challengeList = challenges.length > 0 ? challenges.slice(1) : [];

    // Logic: Calculate progress
    const solvedCount = challenges.filter(c => c.status === "SOLVED").length;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 font-['Satoshi',_sans-serif]">

            {/* === LEFT COLUMN (Main Content) === */}
            <div className="xl:col-span-3 space-y-6">

                {/* 1. Feature Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-video bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#2a2a2a] hover:border-slate-500 transition-colors cursor-pointer group">
                            <ImageIcon className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}
                </div>

                {/* 2. Topic Stats */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
                    <TopicStat label="Array" count={2050} />
                    <TopicStat label="String" count={832} />
                    <TopicStat label="Hash Table" count={759} />
                    <TopicStat label="Math" count={638} />
                    <TopicStat label="Dynamic Programming" count={632} />
                    <span className="text-slate-400 cursor-pointer hover:text-white flex items-center gap-1">
                        Expand <ChevronDown className="w-3 h-3" />
                    </span>
                </div>

                {/* 3. Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                    <FilterButton label="All Topics" active />
                    <FilterButton label="Algorithms" />
                    <FilterButton label="Database" />
                    <FilterButton label="Shell" />
                    <FilterButton label="Concurrency" />
                    <FilterButton label="JavaScript" />
                </div>

                {/* 4. Search & Stats Bar */}
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search questions"
                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-600"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-slate-400 hover:text-white">
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-sm text-slate-500 ml-auto font-mono">
                        {/* Dynamic Progress Count */}
                        {solvedCount} / {challenges.length} Solved
                    </div>
                </div>

                {/* 5. Problem List (DYNAMIC) */}
                <div className="space-y-1">

                    {loading ? (
                        <div className="py-12 text-center text-slate-500 flex justify-center gap-2">
                            <Loader2 className="animate-spin" /> Loading challenges...
                        </div>
                    ) : (
                        <>
                            {/* A. Daily Challenge Highlight */}
                            {dailyChallenge && (
                                <Link
                                    to={`/challenges/${dailyChallenge._id}`}
                                    className="flex items-center justify-between p-4 bg-[#1a1a1a]/50 rounded-lg border border-transparent hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-1 rounded-full bg-emerald-500/10">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block mb-0.5">
                                                Daily Pick
                                            </span>
                                            <span className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm">
                                                {dailyChallenge.title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-xs text-slate-500">98%</span>
                                        <DifficultyBadge level={dailyChallenge.difficulty} />
                                        <Lock className="w-4 h-4 text-amber-500" />
                                    </div>
                                </Link>
                            )}

                            {/* B. The List */}
                            {challengeList.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/challenges/${item._id}`} // Link to the solver
                                    className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer group border border-transparent"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Dynamic Status Icon */}
                                        {item.status === "SOLVED" ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-slate-600" />
                                        )}

                                        <span className={`font-medium text-sm transition-colors ${
                                            item.status === "SOLVED" ? "text-slate-500" : "text-slate-300 group-hover:text-blue-400"
                                        }`}>
                                            {item.title}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <span className="text-xs text-slate-500">
                                            {/* Mock acceptance rate */}
                                            {Math.floor(Math.random() * (80 - 40) + 40)}%
                                        </span>
                                        {/* Dynamic Badge */}
                                        <DifficultyBadge level={item.difficulty} />
                                        <Lock className="w-4 h-4 text-slate-700" />
                                    </div>
                                </Link>
                            ))}

                            {/* Empty State */}
                            {challenges.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    No challenges found.
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* --- PAGINATION CONTROLS (Bottom of List) --- */}
                <div className="flex items-center justify-between pt-6 border-t border-[#2a2a2a] mt-4">
                <span className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                </span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-lg bg-[#282828] text-white hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg bg-[#282828] text-white hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* === RIGHT COLUMN (Widgets) === */}
            <div className="space-y-6">
                {/* 1. Calendar Widget */}
                <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-white">Day 29 <span className="text-slate-500 font-normal">15:45:01 left</span></div>
                        <div className="flex gap-1">
                            <Flame className="w-4 h-4 text-slate-600" />
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                    </div>
                    {/* Mock Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-500 mb-2">
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-slate-400">
                        {[...Array(30)].map((_, i) => {
                            const day = i + 1;
                            const isToday = day === 29;
                            const isDone = day === 28;
                            return (
                                <div key={i} className={`h-7 flex items-center justify-center rounded ${
                                    isToday ? "bg-amber-500 text-black font-bold" :
                                        isDone ? "text-emerald-500" : "hover:bg-white/5"
                                }`}>
                                    {day}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 2. Weekly Premium */}
                <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-white">Weekly Premium</div>
                        <div className="text-xs text-slate-500">less than a day</div>
                    </div>
                    <div className="flex justify-between gap-2 mb-6">
                        {["W1", "W2", "W3", "W4", "W5"].map((w, i) => (
                            <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                i === 4 ? "bg-amber-500 text-black" : "bg-[#2a2a2a] text-amber-600/50"
                            }`}>
                                {w}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <button className="flex items-center gap-1 text-emerald-500 font-bold hover:text-emerald-400">
                            <Gift className="w-3 h-3" /> Redeem
                        </button>
                        <span className="text-slate-500">Rules</span>
                    </div>
                </div>

                {/* 3. Trending Companies */}
                <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-white">Trending Companies</div>
                        <div className="flex gap-2">
                            <button className="text-slate-500 hover:text-white"><ChevronDown className="w-4 h-4" /></button>
                            <button className="text-slate-500 hover:text-white"><ChevronDown className="w-4 h-4 rotate-180" /></button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <SearchIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            placeholder="Search for a company..."
                            className="w-full bg-[#121212] rounded-lg py-2 pl-9 text-xs text-white border border-[#2a2a2a] focus:outline-none focus:border-slate-500"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <CompanyTag name="Google" count={2168} />
                        <CompanyTag name="Meta" count={1350} />
                        <CompanyTag name="Bloomberg" count={1146} />
                        <CompanyTag name="Amazon" count={901} />
                        <CompanyTag name="Microsoft" count={1317} />
                        <CompanyTag name="Apple" count={447} />
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

function FilterButton({ label, active }: { label: string, active?: boolean }) {
    return (
        <button className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            active
                ? "bg-[#2a2a2a] border-[#3e3e3e] text-white"
                : "bg-[#1a1a1a] border-[#2a2a2a] text-slate-400 hover:bg-[#2a2a2a] hover:text-white"
        }`}>
            {label}
        </button>
    );
}

function TopicStat({ label, count }: { label: string, count: number }) {
    return (
        <span className="cursor-pointer hover:text-slate-300 transition-colors">
      {label} <span className="text-slate-600 ml-0.5">{count}</span>
    </span>
    );
}

function CompanyTag({ name, count }: { name: string, count: number }) {
    return (
        <span className="px-2 py-1 bg-[#2a2a2a] rounded-full text-[10px] text-slate-300 flex items-center gap-1 cursor-pointer hover:bg-[#3e3e3e] transition-colors border border-transparent hover:border-slate-600">
         {name} <span className="text-slate-500 bg-[#121212] px-1.5 rounded">{count}</span>
      </span>
    )
}

function DifficultyBadge({ level }: { level: string }) {
    const colors: any = {
        EASY: "text-emerald-500",
        MEDIUM: "text-amber-500",
        HARD: "text-red-500"
    };
    return (
        <span className={`text-xs font-bold w-12 text-right ${colors[level] || "text-slate-500"}`}>
            {level === "MEDIUM" ? "Med." : level}
        </span>
    );
}