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
    Loader2,
    ChevronLeft,
    ChevronRight,
    Calendar
} from "lucide-react";
// We only need the ID now for styling, because the List already contains the data!
import { type Challenge, fetchChallenges, fetchDailyChallengeId } from "../services/challenge";
import DashboardFeatureCards from "../components/DashboardFeatureCards.tsx";

export default function Home() {
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [loading, setLoading] = useState(true)
    const [dailyId, setDailyId] = useState<string | null>(null);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                // 1. Fetch List (Backend now automatically puts Daily at top of Page 1)
                const challengesRes = await fetchChallenges(page);
                setChallenges(challengesRes.data);
                setTotalPages(challengesRes.pagination.pages);

                // 2. Fetch Daily ID just for the "Yellow Label" styling comparison
                const id = await fetchDailyChallengeId();
                setDailyId(id);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [page]);

    // Calculate progress based on local list status
    const solvedCount = challenges.filter(c => c.status === "SOLVED").length;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 font-['Satoshi',_sans-serif]">

            {/* === LEFT COLUMN (Main Content) === */}
            <div className="xl:col-span-3 space-y-6">

                <DashboardFeatureCards />

                {/* Topic Stats */}
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

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                    <FilterButton label="All Topics" active />
                    <FilterButton label="Algorithms" />
                    <FilterButton label="Database" />
                    <FilterButton label="Shell" />
                    <FilterButton label="Concurrency" />
                    <FilterButton label="JavaScript" />
                </div>

                {/* Search & Stats Bar */}
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search questions"
                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-600"
                        />
                    </div>
                    <div className="text-sm text-slate-500 ml-auto font-mono">
                        <span className="text-emerald-500 font-bold mr-1.5">{solvedCount}</span>
                        Solved
                    </div>
                </div>

                {/* === PROBLEM LIST === */}
                <div className="space-y-1">

                    {loading ? (
                        <div className="py-12 text-center text-slate-500 flex justify-center gap-2">
                            <Loader2 className="animate-spin" /> Loading challenges...
                        </div>
                    ) : (
                        <>
                            {challenges.map((item) => {
                                const isDaily = item._id === dailyId;
                                const isSolved = item.status === "SOLVED";

                                return (
                                    <Link
                                        key={item._id}
                                        // ✅ FIXED: Path updated to /challenges/
                                        to={`/challenges/${item._id}`}
                                        className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer group border ${
                                            isDaily
                                                ? "bg-[#1a1a1a]/80 border-amber-500/30 hover:bg-[#1a1a1a] hover:border-amber-500/50 mb-2 shadow-lg shadow-amber-900/10"
                                                : "bg-transparent border-transparent hover:bg-[#1a1a1a]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Status Icon */}
                                            {isSolved ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-500" />
                                            )}

                                            <div className="flex flex-col">
                                                {/* Daily Label */}
                                                {isDaily && (
                                                    <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-0.5 animate-pulse">
                                                        <Calendar className="w-3 h-3" /> Daily Pick
                                                    </span>
                                                )}

                                                <span className={`font-medium text-sm transition-colors ${
                                                    isSolved
                                                        ? "text-slate-500"
                                                        : "text-slate-200 group-hover:text-blue-400"
                                                }`}>
                                                    {item.title}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <span className="text-xs text-slate-500 hidden sm:block">
                                                {Math.floor(Math.random() * (80 - 40) + 40)}%
                                            </span>

                                            <DifficultyBadge level={item.difficulty} />

                                            {isSolved ? (
                                                <div className="w-4 h-4" />
                                            ) : (
                                                <Lock className="w-4 h-4 text-slate-700" />
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}

                            {challenges.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    No challenges found.
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Pagination (Same as before) */}
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

            {/* Right Column (Widgets) - Same as before */}
            <div className="space-y-6">
                <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-white">Day 29 <span className="text-slate-500 font-normal">15:45:01 left</span></div>
                        <div className="flex gap-1">
                            <Flame className="w-4 h-4 text-slate-600" />
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                    </div>
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

                {/* Trending Companies */}
                <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-bold text-white">Trending Companies</div>
                        <div className="flex gap-2">
                            <button className="text-slate-500 hover:text-white"><ChevronDown className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <CompanyTag name="Google" count={2168} />
                        <CompanyTag name="Meta" count={1350} />
                        <CompanyTag name="Amazon" count={901} />
                        <CompanyTag name="Apple" count={447} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Subcomponents
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