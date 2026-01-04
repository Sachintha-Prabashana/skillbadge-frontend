import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    CheckCircle2, Search, 
    ArrowUpRight, Loader2, Sparkles, Trophy
} from "lucide-react";
import { fetchMySolvedChallenges } from "../services/user"; // Ensure correct import path

export default function MySolvedList() {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD">("ALL");

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchMySolvedChallenges();
                setChallenges(data);
                setFilteredChallenges(data);
            } catch (err) {
                console.error("Failed to load solved problems", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Handle Search & Filter Logic
    useEffect(() => {
        let result = challenges;

        if (searchQuery) {
            result = result.filter(c => 
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterDifficulty !== "ALL") {
            result = result.filter(c => c.difficulty === filterDifficulty);
        }

        setFilteredChallenges(result);
    }, [searchQuery, filterDifficulty, challenges]);

    // Calculate Total XP
    const totalXP = challenges.reduce((acc, curr) => acc + (curr.points || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi',_sans-serif] pb-20 relative overflow-hidden">
            
            {/* Background Gradient Blob (Modern Touch) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            {/* === 1. HEADER SECTION === */}
            <div className="relative z-10 pt-12 pb-8 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                                    Collection
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                                Solved <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Problems</span>
                            </h1>
                            <p className="text-slate-400 max-w-lg text-lg">
                                Your personal trophy cabinet. Revisit your victories and refine your solutions.
                            </p>
                        </div>

                        {/* Stats Cards (Compact) */}
                        <div className="flex gap-3">
                            <div className="bg-[#161616]/80 backdrop-blur-md border border-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center min-w-[100px]">
                                <span className="text-3xl font-black text-white">{challenges.length}</span>
                                <span className="text-xs font-bold text-slate-500 uppercase">Solved</span>
                            </div>
                            <div className="bg-[#161616]/80 backdrop-blur-md border border-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center min-w-[100px]">
                                <span className="text-3xl font-black text-amber-400">{totalXP}</span>
                                <span className="text-xs font-bold text-slate-500 uppercase">Total XP</span>
                            </div>
                        </div>
                    </div>

                    {/* === 2. FILTERS BAR === */}
                    <div className="flex flex-col md:flex-row gap-4 p-1.5 bg-[#161616] border border-[#2a2a2a] rounded-2xl mb-10">
                        {/* Search */}
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search challenges..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 bg-transparent text-white text-sm pl-11 pr-4 focus:outline-none placeholder:text-slate-600"
                            />
                        </div>
                        
                        {/* Divider */}
                        <div className="hidden md:block w-px bg-[#2a2a2a] my-2" />

                        {/* Difficulty Tabs */}
                        <div className="flex gap-1 p-1 overflow-x-auto">
                            {(["ALL", "EASY", "MEDIUM", "HARD"] as const).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setFilterDifficulty(level)}
                                    className={`px-6 h-10 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                        filterDifficulty === level 
                                        ? "bg-[#2a2a2a] text-white shadow-lg shadow-black/20 ring-1 ring-white/10" 
                                        : "text-slate-500 hover:text-slate-300 hover:bg-[#2a2a2a]/50"
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* === 3. MODERN GRID CARD LAYOUT === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredChallenges.length > 0 ? (
                            filteredChallenges.map((challenge) => (
                                <Link 
                                    key={challenge._id}
                                    to={`/challenges/${challenge._id}`}
                                    className="group relative bg-[#161616] hover:bg-[#1c1c1c] border border-[#262626] hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between h-[220px]"
                                >
                                    {/* Subtle Gradient Glow on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:to-purple-500/5 rounded-3xl transition-all duration-500" />

                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            {/* Badge */}
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                challenge.difficulty === 'EASY' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : challenge.difficulty === 'MEDIUM' 
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                                {challenge.difficulty}
                                            </span>
                                            
                                            {/* Icon */}
                                            <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:scale-110 transition-transform text-slate-400 group-hover:text-white">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                                            {challenge.title}
                                        </h3>
                                        
                                        <p className="text-sm text-slate-500 font-medium">
                                            {challenge.category || "General"}
                                        </p>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-[#262626] mt-auto">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                                            <Sparkles className="w-3.5 h-3.5 fill-indigo-400" />
                                            {challenge.points || 10} XP
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                            Solved
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#262626] rounded-3xl bg-[#161616]/50">
                                <div className="w-16 h-16 bg-[#262626] rounded-full flex items-center justify-center mb-4">
                                    <Trophy className="w-8 h-8 text-slate-600" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">No Challenges Found</h3>
                                <p className="text-slate-500 max-w-xs">
                                    Try adjusting your filters or complete more challenges to see them here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}