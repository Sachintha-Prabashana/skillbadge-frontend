import { Lock, Award } from "lucide-react";

export default function BadgesSection({ badges }: { badges: any[] }) {
    // If user has no badges, show placeholder logic
    const hasBadges = badges && badges.length > 0;
    const displayCount = hasBadges ? badges.length : 0;

    return (
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6 flex flex-col h-full">
            <div className="mb-4">
                <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Badges</h3>
                <span className="text-4xl font-bold text-white font-mono">{displayCount}</span>
            </div>

            <div className="flex-1 flex items-center justify-center">
                {hasBadges ? (
                    <div className="grid grid-cols-3 gap-2 w-full">
                        {badges.slice(0, 3).map((badge, i) => (
                            <div key={i} className="bg-[#1a1a1a] p-2 rounded-lg border border-[#3e3e3e] flex flex-col items-center">
                                {/* Replace with <img src={badge.iconUrl} /> if you have it */}
                                <Award className="w-8 h-8 text-yellow-500 mb-1" />
                                <span className="text-[10px] text-slate-300 text-center leading-tight">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-[#3e3e3e] w-full">
                        <div className="w-12 h-12 bg-[#282828] rounded-lg flex items-center justify-center border border-[#3e3e3e] opacity-50">
                            <Lock className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase mb-0.5">Next Goal</p>
                            <p className="text-white font-bold text-sm">Solve 5 Problems</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}