import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    CheckCircle2, Search, Filter, Zap, 
    ArrowUpRight, Loader2, Calendar, ChevronLeft, ChevronRight, MoreHorizontal
} from "lucide-react";
import { fetchMySolvedChallenges } from "../services/user";

export default function MySolvedList() {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [filteredChallenges, setFilteredChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD">("ALL");

    // Pagination State (Mocking for UI purposes)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchMySolvedChallenges();
                setChallenges(data);
                setFilteredChallenges(data);
            } catch (err) {
                console.error("Error", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

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
        setCurrentPage(1); // Reset page on filter change
    }, [searchQuery, filterDifficulty, challenges]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="w-6 h-6 text-indigo-500 animate-spin"/></div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-['Satoshi',_sans-serif] pb-20">
            
            {/* Header Background */}
            <div className="h-64 bg-gradient-to-b from-[#161616] to-[#0a0a0a] border-b border-[#262626] pt-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">My Submissions</h1>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <span>Total Solved: <b className="text-white">{challenges.length}</b></span>
                        <span>Total XP: <b className="text-amber-400">{challenges.reduce((a, b) => a + (b.points || 0), 0)}</b></span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-20">
                
                {/* === MAIN CARD CONTAINER === */}
                <div className="bg-[#111] border border-[#262626] rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                    
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#262626] flex flex-col md:flex-row gap-4 items-center justify-between bg-[#111]">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                                type="text" 
                                placeholder="Search problems..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1c1c1c] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-1 bg-[#1c1c1c] p-1 rounded-lg border border-[#333]">
                            {(["ALL", "EASY", "MEDIUM", "HARD"] as const).map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setFilterDifficulty(lvl)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                                        filterDifficulty === lvl ? "bg-[#333] text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* === DATA TABLE === */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#161616] text-xs uppercase text-slate-500 font-bold border-b border-[#262626]">
                                    <th className="px-6 py-4 w-[40%]">Problem Name</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Difficulty</th>
                                    <th className="px-6 py-4">XP</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262626]">
                                {currentItems.length > 0 ? (
                                    currentItems.map((challenge) => (
                                        <tr key={challenge._id} className="group hover:bg-[#1a1a1a] transition-colors">
                                            
                                            {/* 1. Problem Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-[#262626] flex items-center justify-center text-slate-500 font-mono text-xs">
                                                        {/* Extract initials or use an icon */}
                                                        {challenge.title.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <Link to={`/challenges/${challenge._id}`} className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                                                            {challenge.title}
                                                        </Link>
                                                        <div className="text-xs text-slate-500 mt-0.5">
                                                            {challenge.category || "Algorithm"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 2. Status */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded w-fit">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    <span>Solved</span>
                                                </div>
                                            </td>

                                            {/* 3. Difficulty */}
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-bold ${
                                                    challenge.difficulty === 'EASY' ? 'text-emerald-400' :
                                                    challenge.difficulty === 'MEDIUM' ? 'text-amber-400' : 'text-rose-400'
                                                }`}>
                                                    {challenge.difficulty}
                                                </span>
                                            </td>

                                            {/* 4. XP / Date */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                                                    {challenge.points || 0}
                                                </div>
                                            </td>

                                            {/* 5. Action */}
                                            <td className="px-6 py-4 text-right">
                                                <Link 
                                                    to={`/challenges/${challenge._id}`}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#262626] hover:bg-indigo-600 hover:text-white text-slate-400 text-xs font-bold rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    Practice <ArrowUpRight className="w-3 h-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No challenges found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* === PAGINATION FOOTER === */}
                    <div className="p-4 border-t border-[#262626] bg-[#161616] flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                            Showing <span className="text-white">{indexOfFirstItem + 1}</span> - <span className="text-white">{Math.min(indexOfLastItem, filteredChallenges.length)}</span> of {filteredChallenges.length}
                        </span>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded bg-[#262626] hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed text-slate-400"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded bg-[#262626] hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed text-slate-400"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}