import React, { useEffect, useState } from "react";
import { Trophy, Medal, Flame, Crown, Loader2, Award, User, Star, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchLeaderboard, type LeaderboardUser } from "../services/user.ts";
import PodiumCard from "../components/PodiumCard.tsx";


export default function Leaderboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        // 1. Get Current User ID (from LocalStorage/Token) to highlight "Me"
        const storedUser = localStorage.getItem("user"); // Assuming you saved user object on login
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setCurrentUserId(parsed._id);
        }

        const loadData = async () => {
            try {
                const data = await fetchLeaderboard();
                setUsers(data);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-slate-500 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <p>Calculating Rankings...</p>
            </div>
        );
    }

    // Split Data
    const topThree = [users[0], users[1], users[2]];
    const restOfUsers = users.slice(3);

    return (
        <div className="max-w-5xl mx-auto space-y-12 font-['Satoshi',_sans-serif] pb-20">

            {/* --- HEADER --- */}
            <div className="text-center space-y-4 pt-4">
                <h1 className="text-4xl font-bold text-white tracking-tight">Global Leaderboard</h1>
                <p className="text-slate-400">See who is leading the race to become a Code Legend.</p>
            </div>

            {/* --- THE PODIUM (Safe Check) --- */}
            {users.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-center px-4">
                    {/* 2nd Place */}
                    <div className="order-2 md:order-1">
                        {topThree[1] && <PodiumCard user={topThree[1]} rank={2} color="slate" />}
                    </div>
                    {/* 1st Place */}
                    <div className="order-1 md:order-2 transform md:-translate-y-6">
                        {topThree[0] && <PodiumCard user={topThree[0]} rank={1} color="amber" />}
                    </div>
                    {/* 3rd Place */}
                    <div className="order-3">
                        {topThree[2] && <PodiumCard user={topThree[2]} rank={3} color="orange" />}
                    </div>
                </div>
            )}

            {/* --- THE LIST (Rank 4+) --- */}
            <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl overflow-hidden shadow-xl mx-4 sm:mx-0">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-[#1f1f1f] text-slate-200 font-bold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4 w-20 text-center">Rank</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4 text-center">Streak</th>
                        <th className="px-6 py-4 text-right hidden sm:table-cell">Badges</th>
                        <th className="px-6 py-4 text-right">Points</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3e3e3e]">
                    {restOfUsers.map((user, index) => {
                        const isMe = user._id === currentUserId; // Check if this row is ME

                        return (
                            <tr
                                key={user._id}
                                onClick={() => navigate(`/profile/${user._id}`)} // Navigate to profile
                                className={`transition-colors group cursor-pointer ${
                                    isMe
                                        ? "bg-indigo-900/20 hover:bg-indigo-900/30 border-l-4 border-l-indigo-500" // Highlight Logic
                                        : "hover:bg-[#333] border-l-4 border-l-transparent"
                                }`}
                            >
                                <td className="px-6 py-4 text-center font-mono font-bold text-slate-500 group-hover:text-white transition-colors">
                                    {index + 4}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs text-white font-bold overflow-hidden ${
                                            isMe ? "border-indigo-500 ring-2 ring-indigo-500/20" : "bg-slate-700 border-slate-600"
                                        }`}>
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random&color=fff`}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <span className={`font-medium transition-colors ${isMe ? "text-indigo-400" : "text-slate-200 group-hover:text-white"}`}>
                                                {user.firstname} {user.lastname}
                                            </span>
                                            {isMe && <span className="ml-2 text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded">YOU</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {user.currentStreak > 0 ? (
                                        <div className="inline-flex items-center gap-1.5 text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-full text-xs">
                                            <Flame className="w-3.5 h-3.5 fill-orange-500" /> {user.currentStreak}
                                        </div>
                                    ) : (
                                        <span className="text-slate-600">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right hidden sm:table-cell">
                                    <div className="flex justify-end -space-x-2">
                                        {user.badges.slice(0, 3).map((badge, i) => (
                                            <div key={i} className="w-7 h-7 rounded-full bg-[#2a2a2a] border border-[#3e3e3e] flex items-center justify-center text-[10px] text-yellow-500 relative group/badge">
                                                <DynamicBadgeIcon name={badge.icon} />
                                            </div>
                                        ))}
                                        {user.badges.length > 3 && (
                                            <div className="w-7 h-7 rounded-full bg-[#2a2a2a] border border-[#3e3e3e] flex items-center justify-center text-[10px] text-slate-400 font-bold">
                                                +{user.badges.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">
                                    {user.points.toLocaleString()} XP
                                </td>
                            </tr>
                        );
                    })}

                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-slate-500">
                                No users found. Be the first to join!
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

// --- HELPER FOR DYNAMIC ICONS ---
function DynamicBadgeIcon({ name }: { name: string }) {
    // Map backend string names to Lucide Components
    const iconMap: any = {
        "Star": Star,
        "Zap": Zap,
        "Crown": Crown,
        "Flame": Flame,
        "Award": Award,
        "Shield": Shield
    };

    const IconComponent = iconMap[name] || Award; // Default to Award if not found
    return <IconComponent className="w-4 h-4" />;
}