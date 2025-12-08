import { Info } from "lucide-react";

interface Props {
    calendar: Record<string, number>;
}

export default function HeatmapSection({ calendar }: Props) {
    // 1. Calculate Stats from Real Data
    const submissionCounts = Object.values(calendar);
    const totalSubmissions = submissionCounts.reduce((a, b) => a + b, 0);
    const activeDays = Object.keys(calendar).length;

    // 2. Logic to generate the last 365 days (approx 52 weeks)
    // We want to render 52 columns (weeks) x 7 rows (days)
    const weeks = 52;
    const daysPerWeek = 7;

    // Helper to determine color intensity
    const getColor = (dateStr: string) => {
        const count = calendar[dateStr] || 0;
        if (count === 0) return "bg-[#3e3e3e]";
        if (count <= 2) return "bg-emerald-900";
        if (count <= 5) return "bg-emerald-700";
        return "bg-emerald-500";
    };

    return (
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h3 className="text-white font-bold flex items-center gap-2">
                    {totalSubmissions} submissions in the past year
                    <Info className="w-4 h-4 text-slate-500 cursor-help hover:text-white transition-colors" />
                </h3>
                <div className="text-xs text-slate-500 flex gap-4 font-mono">
                    <span>Total active days: <span className="text-white">{activeDays}</span></span>
                </div>
            </div>

            <div className="overflow-x-auto pb-2 custom-scrollbar">
                <div className="flex gap-1 min-w-max">
                    {/* Generate 52 Weeks */}
                    {Array.from({ length: weeks }).map((_, weekIndex) => {
                        // Calculate how many weeks ago this column is
                        const weeksAgo = weeks - 1 - weekIndex;

                        return (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {/* Generate 7 Days */}
                                {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                                    // Calculate the exact date for this cell
                                    const d = new Date();
                                    // Subtract weeks, then adjust for day of week
                                    d.setDate(d.getDate() - (weeksAgo * 7) + (dayIndex - 6));

                                    const dateStr = d.toISOString().split('T')[0]; // "2023-12-01"
                                    const count = calendar[dateStr] || 0;

                                    return (
                                        <div
                                            key={dayIndex}
                                            className={`w-3 h-3 rounded-sm ${getColor(dateStr)} hover:ring-1 ring-white/50 transition-all`}
                                            title={`${dateStr}: ${count} submissions`}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}