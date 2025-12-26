import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    ChevronDown,
    CheckCircle2,
    Circle,
    Lock,
    Flame,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Filter
} from "lucide-react";
import { type Challenge, fetchChallenges, fetchDailyChallengeId } from "../services/challenge";
import DashboardFeatureCards from "../components/DashboardFeatureCards.tsx";

// --- CONSTANTS ---
const CATEGORIES = [
    "All Topics", "Array", "String", "Hash Table", "Dynamic Programming",
    "Math", "Sorting", "Greedy", "Depth-First Search",
    "Binary Search", "Database", "SQL"
];

const PageContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-[1920px] mx-auto">
        {children}
    </div>
);

export default function Home() {
    // --- DATA STATE ---
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [loading, setLoading] = useState(true)
    const [dailyId, setDailyId] = useState<string | null>(null);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // --- FILTER STATE ---
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Topics");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");

    // 1. Debounce Search Logic (Wait 500ms before API call)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to page 1 on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // 2. Data Fetching Effect
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                // Pass all filters to the backend service
                // Note: Ensure your fetchChallenges service signature accepts these params!
                // fetchChallenges(page, limit, search, difficulty, category)
                const challengesRes = await fetchChallenges(
                    page,
                    10,
                    debouncedSearch,
                    selectedDifficulty,
                    selectedCategory
                );

                setChallenges(challengesRes.data);
                setTotalPages(challengesRes.pagination.totalPages);

                // Fetch Daily ID separately
                const id = await fetchDailyChallengeId();
                setDailyId(id);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [page, debouncedSearch, selectedDifficulty, selectedCategory]);

    const solvedCount = challenges.filter(c => c.status === "SOLVED").length;

    // --- HANDLERS ---
    const handleCategoryClick = (cat: string) => {
        setSelectedCategory(cat);
        setPage(1);
    };

    const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(e.target.value);
        setPage(1);
    };

    return (
        <PageContainer>
            {/* GRID LAYOUT:
                - Mobile/Tablet/Laptop (up to 1279px): 1 Column
                - Desktop (1280px+): 4 Columns (3 Content + 1 Widget)
            */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 font-['Satoshi',_sans-serif]">

                {/* === LEFT COLUMN (MAIN CONTENT) === */}
                <div className="xl:col-span-3 space-y-6">

                    {/* 1. Feature Cards Slider (Horizontal Scroll on ALL screens) */}
                    <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-4 scrollbar-hide">
                        <DashboardFeatureCards />
                    </div>

                    {/* 2. Topic Stats (Hidden on Mobile < 640px) */}
                    <div className="hidden sm:flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
                        <TopicStat label="Array" count={2050} />
                        <TopicStat label="String" count={832} />
                        <TopicStat label="Hash Table" count={759} />
                        <TopicStat label="Math" count={638} />
                        <TopicStat label="Dynamic Programming" count={632} />
                        <span className="text-slate-400 cursor-pointer hover:text-white flex items-center gap-1">
                            Expand <ChevronDown className="w-3 h-3" />
                        </span>
                    </div>

                    {/* 3. Filter Buttons (Categories) */}
                    <div className="flex items-center gap-2">
                        {/* Mobile Icon */}
                        <button className="sm:hidden p-2.5 rounded-lg bg-[#1a1a1a] text-slate-400 border border-[#2a2a2a] shrink-0">
                            <Filter className="w-4 h-4" />
                        </button>

                        {/* Scrollable List */}
                        <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 -mr-4 pr-4 sm:mr-0 sm:pr-0 scrollbar-hide flex-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat)}
                                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                        selectedCategory === cat
                                            ? "bg-[#2a2a2a] border-[#3e3e3e] text-white"
                                            : "bg-[#1a1a1a] border-[#2a2a2a] text-slate-400 hover:bg-[#222]"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. Search Bar & Difficulty Dropdown */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search questions..."
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                            />
                        </div>

                        {/* Difficulty Select */}
                        <div className="relative">
                            <select
                                value={selectedDifficulty}
                                onChange={handleDifficultyChange}
                                className="appearance-none w-full sm:w-auto bg-[#1a1a1a] border border-[#2a2a2a] text-slate-300 text-sm rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:border-slate-600 cursor-pointer hover:bg-[#222] transition-all"
                            >
                                <option value="All">All Difficulties</option>
                                <option value="EASY">Easy</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HARD">Hard</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Progress Count (Desktop only) */}
                        <div className="text-sm text-slate-500 font-mono hidden xl:block ml-2">
                            <span className="text-emerald-500 font-bold mr-1.5">{solvedCount}</span>
                            Problem Solved
                        </div>
                    </div>

                    {/* 5. Challenge List */}
                    <div className="space-y-1">
                        {loading ? (
                            <div className="py-12 text-center text-slate-500 flex justify-center gap-2">
                                <Loader2 className="animate-spin" /> Loading...
                            </div>
                        ) : (
                            <>
                                {challenges.map((item) => {
                                    const isDaily = item._id === dailyId;
                                    const isSolved = item.status === "SOLVED";
                                    return (
                                        <Link
                                            key={item._id}
                                            to={`/challenges/${item._id}`}
                                            className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer group border ${
                                                isDaily
                                                    ? "bg-[#1a1a1a]/80 border-amber-500/30 hover:bg-[#1a1a1a] hover:border-amber-500/50 mb-2 shadow-lg shadow-amber-900/10"
                                                    : "bg-transparent border-transparent hover:bg-[#1a1a1a]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                {isSolved ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-500 shrink-0" />
                                                )}
                                                <div className="flex flex-col min-w-0">
                                                    {isDaily && (
                                                        <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-0.5">
                                                            <Calendar className="w-3 h-3" /> Daily Pick
                                                        </span>
                                                    )}
                                                    <span className={`font-medium text-sm truncate ${isSolved ? "text-slate-500" : "text-slate-200 group-hover:text-blue-400"}`}>
                                                        {item.title}
                                                    </span>
                                                    {/* Optional: Show category tags below title */}
                                                    {item.categories && item.categories.length > 0 && (
                                                        <div className="flex gap-1 mt-1">
                                                            {item.categories.slice(0, 2).map((cat, i) => (
                                                                <span key={i} className="text-[10px] bg-[#2a2a2a] text-slate-400 px-1.5 rounded">{cat}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-2">
                                                {/* Hidden on 425px Mobile */}
                                                <span className="text-xs text-slate-500 hidden sm:block">
                                                    {Math.floor(Math.random() * (80 - 40) + 40)}%
                                                </span>
                                                <DifficultyBadge level={item.difficulty} />
                                                {isSolved ? <div className="w-4 h-4"/> : <Lock className="w-4 h-4 text-slate-700 hidden sm:block" />}
                                            </div>
                                        </Link>
                                    );
                                })}

                                {challenges.length === 0 && (
                                    <div className="py-12 text-center text-slate-500">
                                        No challenges found matching your filters.
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* 6. Pagination */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#2a2a2a] mt-4">
                        <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg bg-[#282828] text-white hover:bg-[#3e3e3e] disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4"/>
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg bg-[#282828] text-white hover:bg-[#3e3e3e] disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* === RIGHT COLUMN (WIDGETS) === */}
                {/* - hidden: Hides on default (Mobile 425px)
                    - sm:block: Shows on Tablet/Laptop/Desktop
                */}
                <div className="hidden sm:block space-y-6 xl:col-span-1">

                    {/* Calendar Widget */}
                    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm font-bold text-white">Day 29 <span className="text-slate-500 font-normal ml-1">15h left</span></div>
                            <div className="flex gap-1">
                                <Flame className="w-4 h-4 text-slate-600" />
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] text-slate-500 mb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-medium text-slate-400">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className={`h-6 sm:h-7 flex items-center justify-center rounded text-[10px] sm:text-xs ${
                                    i === 28 ? "bg-amber-500 text-black font-bold" : "hover:bg-white/5"
                                }`}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Companies */}
                    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a]">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm font-bold text-white">Trending Companies</div>
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <CompanyTag name="Google" count={2168} />
                            <CompanyTag name="Meta" count={1350} />
                            <CompanyTag name="Amazon" count={901} />
                        </div>
                    </div>
                </div>

            </div>
        </PageContainer>
    );
}

// --- SUBCOMPONENTS ---
function TopicStat({ label, count }: { label: string, count: number }) {
    return <span className="cursor-pointer hover:text-slate-300 transition-colors">{label} <span className="text-slate-600 ml-0.5">{count}</span></span>;
}

function CompanyTag({ name, count }: { name: string, count: number }) {
    return <span className="px-2 py-1 bg-[#2a2a2a] rounded-full text-[10px] text-slate-300 flex items-center gap-1 cursor-pointer hover:bg-[#3e3e3e] border border-transparent hover:border-slate-600">{name} <span className="text-slate-500 bg-[#121212] px-1.5 rounded">{count}</span></span>
}

function DifficultyBadge({ level }: { level: string }) {
    const colors: any = { EASY: "text-emerald-500", MEDIUM: "text-amber-500", HARD: "text-red-500" };
    return <span className={`text-xs font-bold w-12 text-right ${colors[level] || "text-slate-500"}`}>{level === "MEDIUM" ? "Med." : level}</span>;
}