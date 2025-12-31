interface SolvedStats {
    total: number;
    totalQuestions: number;
    easy: number;
    medium: number;
    hard: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
}

export default function ProgressSection({ solved }: { solved: SolvedStats }) {

    // Helper to calculate percentage width
    const getPct = (solved: number, total: number) => {
        if (total === 0) return 0;
        return Math.min(100, (solved / total) * 100);
    };

    return (
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full">
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            {/* Header */}
            <div className="mb-6">
                <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Solved Problems</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white font-mono">{solved.total}</span>
                    <span className="text-sm text-slate-500 font-mono">/ {solved.totalQuestions}</span>
                </div>
            </div>

            {/* Bars */}
            <div className="space-y-4">
                {/* Easy */}
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-emerald-400 font-bold">Easy</span>
                        <span className="text-slate-400 font-mono">{solved.easy} <span className="text-slate-600">/ {solved.totalEasy}</span></span>
                    </div>
                    <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${getPct(solved.easy, solved.totalEasy)}%` }}></div>
                    </div>
                </div>

                {/* Medium */}
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-yellow-400 font-bold">Medium</span>
                        <span className="text-slate-400 font-mono">{solved.medium} <span className="text-slate-600">/ {solved.totalMedium}</span></span>
                    </div>
                    <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${getPct(solved.medium, solved.totalMedium)}%` }}></div>
                    </div>
                </div>

                {/* Hard */}
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-red-400 font-bold">Hard</span>
                        <span className="text-slate-400 font-mono">{solved.hard} <span className="text-slate-600">/ {solved.totalHard}</span></span>
                    </div>
                    <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${getPct(solved.hard, solved.totalHard)}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}