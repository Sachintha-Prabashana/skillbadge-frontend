import { Crown } from "lucide-react";
import { type LeaderboardUser } from "../services/user.ts"; // Import the type

interface PodiumCardProps {
    user: LeaderboardUser;
    rank: number;
    color: "amber" | "slate" | "orange";
}

export default function PodiumCard({ user, rank, color }: PodiumCardProps) {

    // Dynamic styles configuration
    const colorStyles = {
        amber: {
            bg: "bg-gradient-to-b from-amber-500/10 to-[#282828]",
            border: "border-amber-500/50",
            text: "text-amber-400",
            badge: "bg-amber-500/20 text-amber-300"
        },
        slate: {
            bg: "bg-[#282828]",
            border: "border-slate-500/50",
            text: "text-slate-300",
            badge: "bg-slate-500/20 text-slate-300"
        },
        orange: {
            bg: "bg-[#282828]",
            border: "border-orange-700/50",
            text: "text-orange-400",
            badge: "bg-orange-500/20 text-orange-300"
        }
    };

    const style = colorStyles[color];

    return (
        <div className={`${style.bg} border ${style.border} p-6 rounded-2xl flex flex-col items-center relative shadow-2xl transition-transform hover:-translate-y-2 duration-300`}>

            {/* Rank Badge */}
            <div className="absolute -top-5 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-4 border-[#1a1a1a] bg-gradient-to-br from-gray-700 to-black z-10">
                {rank === 1 ? <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" /> : rank}
            </div>

            {/* Avatar */}
            <div className={`w-20 h-20 rounded-full mb-4 overflow-hidden border-4 ${style.border} shadow-lg`}>
                <img
                    src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random&color=fff`}
                    alt={user.firstname}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Name */}
            <h3 className="font-bold text-white text-lg text-center line-clamp-1 w-full">
                {user.firstname}
            </h3>

            {/* Points */}
            <p className={`${style.text} font-mono font-bold mt-1 text-xl`}>
                {user.points.toLocaleString()} XP
            </p>

            {/* Champion Label */}
            {rank === 1 && (
                <span className={`text-xs ${style.badge} px-3 py-1 rounded-full mt-3 font-bold uppercase tracking-wider`}>
          Champion
        </span>
            )}
        </div>
    );
}