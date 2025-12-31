import {
    Lock,
    Award,
    Star,
    Sword,
    Crown,
    Hammer,
    Axe,
    Flame
} from "lucide-react";

// 1. Map backend string names to actual Lucide components
const ICON_MAP: any = {
    "Star": Star,
    "Sword": Sword,
    "Crown": Crown,
    "Hammer": Hammer,
    "Axe": Axe,
    "Flame": Flame,
    "Award": Award // Fallback
};

export default function BadgesSection({ badges }: { badges: any[] }) {
    const hasBadges = badges && badges.length > 0;

    return (
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-5 flex flex-col h-full min-h-[180px]">

            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    Achievements
                </h3>
                {hasBadges && (
                    <span className="bg-[#1a1a1a] border border-[#3e3e3e] text-xs text-slate-400 px-2 py-0.5 rounded-full font-mono">
                        {badges.length}
                    </span>
                )}
            </div>

            {/* --- BADGE GRID (Scrollable) --- */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {hasBadges ? (
                    <div className="grid grid-cols-3 gap-3">
                        {badges.map((badge, i) => {
                            // 2. Dynamically resolve the icon
                            const IconComponent = ICON_MAP[badge.icon] || Award;

                            return (
                                <div
                                    key={i}
                                    className="group flex flex-col items-center bg-[#1a1a1a] p-3 rounded-xl border border-[#3e3e3e] hover:border-yellow-500/30 transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] relative"
                                    title={badge.description} // Tooltip
                                >
                                    {/* Icon with dynamic color from backend */}
                                    <div className="mb-2 p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                        <IconComponent className={`w-6 h-6 ${badge.color || "text-yellow-500"}`} />
                                    </div>

                                    <span className="text-[10px] text-slate-300 text-center font-medium leading-tight line-clamp-2">
                                        {badge.displayName || badge.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* --- EMPTY STATE --- */
                    <div className="h-full flex flex-col items-center justify-center text-center bg-[#1a1a1a] rounded-xl border border-[#3e3e3e] border-dashed p-4 opacity-70">
                        <div className="w-10 h-10 bg-[#282828] rounded-full flex items-center justify-center mb-2 border border-[#3e3e3e]">
                            <Lock className="w-4 h-4 text-slate-500" />
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase mb-1">Locked</p>
                        <p className="text-white font-bold text-xs">Solve 5 Problems</p>
                    </div>
                )}
            </div>
        </div>
    );
}