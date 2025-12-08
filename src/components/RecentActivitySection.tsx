import { Activity, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ActivityItem {
    title: string;
    time: string;
    status: "PASSED" | "FAILED" | "ERROR";
}

export default function RecentActivitySection({ activities }: { activities: ActivityItem[] }) {

    // Format Date Helper
    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#3e3e3e] bg-[#1a1a1a]">
                <Activity className="w-4 h-4 text-slate-400" />
                <h3 className="text-white font-bold text-sm">Recent Activity</h3>
            </div>

            <div className="divide-y divide-[#3e3e3e]">
                {activities.length > 0 ? (
                    activities.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-4 hover:bg-[#1a1a1a] transition-colors group">
                            <div>
                                <p className="text-white font-medium text-sm group-hover:text-indigo-400 transition-colors cursor-pointer">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Submitted on {formatDate(item.time)}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {item.status === "PASSED" && (
                                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                            </span>
                                )}
                                {item.status === "FAILED" && (
                                    <span className="text-red-500 text-xs font-bold flex items-center gap-1.5 bg-red-500/10 px-2 py-1 rounded">
                                <XCircle className="w-3.5 h-3.5" /> Wrong Answer
                            </span>
                                )}
                                {item.status === "ERROR" && (
                                    <span className="text-yellow-500 text-xs font-bold flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded">
                                <AlertCircle className="w-3.5 h-3.5" /> Error
                            </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-slate-500 text-sm">No submissions yet.</p>
                        <p className="text-slate-600 text-xs mt-1">Go solve your first challenge!</p>
                    </div>
                )}
            </div>
        </div>
    );
}