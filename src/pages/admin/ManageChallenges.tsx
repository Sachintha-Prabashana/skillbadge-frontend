import { useEffect, useState } from "react";
import {
    Plus, Trash2, Edit, Search, Loader2,
    ChevronLeft, ChevronRight, FileCode
} from "lucide-react";
import { fetchChallenges, deleteChallenge, type ChallengeData } from "../../services/admin/admin.challenge.ts";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";

export default function AdminChallenges() {
    const { showToast } = useToast();

    // --- STATE ---
    const [challenges, setChallenges] = useState<ChallengeData[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [page, setPage] = useState(1);

    // Pagination Metadata
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // --- EFFECT: Load Data ---
    useEffect(() => {
        const timer = setTimeout(() => {
            loadData();
        }, 500);
        return () => clearTimeout(timer);
    }, [page, search, difficulty]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchChallenges(page, search, difficulty);
            setChallenges(res.data);
            setTotalPages(res.pagination.totalPages);
            setTotalItems(res.pagination.total);
        } catch (error) {
            showToast("Failed to fetch challenges", "error");
        } finally {
            setLoading(false);
        }
    };

    // --- ACTIONS ---
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure? This will delete the challenge permanently.")) return;

        try {
            await deleteChallenge(id);
            showToast("Challenge deleted successfully", "success");
            loadData();
        } catch (error) {
            showToast("Failed to delete challenge", "error");
        }
    };

    return (
        <div className="min-h-screen">
            {/* 1. Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Challenges</h1>
                    <p className="text-slate-500 mt-1">
                        Manage your coding problems. Total: <span className="font-bold text-slate-900">{totalItems}</span>
                    </p>
                </div>
                <Link
                    to="/admin/challenges/new"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-5 h-5" />
                    Create Challenge
                </Link>
            </div>

            {/* 2. Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="flex-1 flex items-center relative w-full">
                    <Search className="absolute left-3 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                {/* Difficulty Dropdown */}
                <select
                    value={difficulty}
                    onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
                    className="w-full md:w-48 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 bg-white text-slate-700 cursor-pointer"
                >
                    <option value="All">All Difficulties</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>
            </div>

            {/* 3. Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-indigo-600" /></div>
                ) : challenges.length === 0 ? (
                    <div className="p-16 text-center text-slate-500 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <FileCode className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No challenges found</h3>
                        <p className="max-w-xs mx-auto mt-1 text-sm">
                            Try adjusting your search filters or create a new challenge.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* ✅ FIX: Wrapper starts here and encloses the table */}
                        <div className="overflow-x-auto w-full">
                            {/* ✅ FIX: Added min-w-[800px] to force scroll on small screens */}
                            <table className="w-full min-w-[800px] text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                        <th className="p-4 pl-6">Title</th>
                                        <th className="p-4">Difficulty</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Points</th>
                                        <th className="p-4 text-right pr-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {challenges.map((challenge) => (
                                        <tr key={challenge._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-4 pl-6">
                                                <div className="font-bold text-slate-500">{challenge.title}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${challenge.difficulty === 'EASY' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        challenge.difficulty === 'MEDIUM' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                            'bg-red-50 text-red-600 border-red-100'
                                                    }`}>
                                                    {challenge.difficulty}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {Array.isArray(challenge.categories) && challenge.categories.length > 0 ? (
                                                        challenge.categories.map((cat, index) => (
                                                            <span
                                                                key={index}
                                                                className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200"
                                                            >
                                                                {cat}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-slate-400 text-xs italic">No category</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-bold text-slate-700">
                                                {challenge.points} XP
                                            </td>
                                            <td className="p-4 text-right pr-6">
                                                <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        to={`/admin/challenges/edit/${challenge._id}`}
                                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(challenge._id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* ✅ FIX: Wrapper ends here */}

                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                            <span className="text-xs text-slate-500">
                                Page <b>{page}</b> of <b>{totalPages}</b>
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}