import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    MapPin, Calendar, Link as LinkIcon,
    Github, Twitter, Flame, Trophy, Target,
    Loader2, Edit2, Camera, Star, Zap, Crown, Award
} from "lucide-react";
import { toast } from "sonner"; // Or 'react-hot-toast'
import StatRow from "../components/StatRow";
import SocialButton from "../components/SocialButton";
import {fetchUsersProfile, uploadAvatar} from "../services/user.ts";
import {useAuth} from "../context/authContext.tsx";

export default function Profile() {
    const { id } = useParams();
    const { user: authUser, refreshUser } = useAuth(); // Global auth state

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false); // New state for upload status

    const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden input

    // Logic: Check if I am viewing my own profile
    const isMe = !id || id === "me" || (authUser && id === authUser._id);

    // 1. Load Data
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchUsersProfile(id || "me");
                setUser(data);
            } catch (err) {
                console.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, authUser]); // Reload if authUser changes (after upload)

    // 2. Handle File Upload
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation: Max 2MB
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image too large. Max size is 2MB.");
            return;
        }

        setUploading(true);

        try {
            // A. Send to Backend
            await uploadAvatar(file);

            // B. Refresh Global Auth (Updates Header Avatar)
            await refreshUser();

            // C. Refresh Local State (Updates Profile Page Image)
            const updatedData = await fetchUsersProfile("me");
            setUser(updatedData);

            toast.success("Profile picture updated!");

        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="h-screen bg-[#1a1a1a] flex items-center justify-center text-slate-500"><Loader2 className="animate-spin" /></div>;
    if (!user) return <div className="text-white text-center pt-20">User not found</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6 font-['Satoshi',_sans-serif] pb-20">

            {/* --- TOP HEADER CARD --- */}
            <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* --- AVATAR SECTION WITH UPLOAD --- */}
                <div className="relative group">

                    {/* Avatar Image Container */}
                    <div className="w-32 h-32 rounded-full border-4 border-[#1a1a1a] overflow-hidden shadow-2xl relative bg-slate-800">

                        {/* Loading Overlay */}
                        {uploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                            </div>
                        )}

                        <img
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random&size=256`}
                            alt="Profile"
                            className={`w-full h-full object-cover transition-opacity ${uploading ? 'opacity-50' : 'opacity-100'}`}
                        />
                    </div>

                    {/* Edit Button (Only visible if isMe) */}
                    {isMe && (
                        <>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleImageChange}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="absolute bottom-1 right-1 bg-[#1a1a1a] p-2.5 rounded-full border border-[#3e3e3e] cursor-pointer hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all z-30 text-slate-400 disabled:opacity-50 shadow-lg"
                                title="Change Profile Picture"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>

                <div className="flex-1 space-y-3 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{user.firstname} {user.lastname}</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Full Stack Developer • Level {Math.floor((user.points || 0) / 1000) + 1} Coder
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> Sri Lanka
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                        <SocialButton icon={Github} href="https://github.com" />
                        <SocialButton icon={Twitter} />
                    </div>
                </div>

                <div className="text-right hidden md:block">
                    <div className="bg-[#1a1a1a] border border-[#3e3e3e] px-5 py-3 rounded-xl text-center">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Global Rank</p>
                        <p className="text-2xl font-mono font-bold text-white mt-1">#{user.rank || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* --- LEFT COLUMN: STATS --- */}
                <div className="space-y-6">
                    <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-6">Career Stats</h3>
                        <div className="space-y-6">
                            <StatRow
                                label="Total XP"
                                value={user.points?.toLocaleString() || 0}
                                icon={Trophy}
                                color="text-yellow-500"
                            />
                            <StatRow
                                label="Total Solved"
                                value={user.totalSubmissions || user.completedChallenges?.length || 0}
                                icon={Target}
                                color="text-emerald-500"
                            />
                            <StatRow
                                label="Current Streak"
                                value={`${user.currentStreak || 0} Days`}
                                icon={Flame}
                                color="text-orange-500"
                            />
                        </div>
                    </div>

                    {/* Badges Section */}
                    <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-6">Badges ({user.badges?.length || 0})</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {user.badges?.map((badge: any) => (
                                <div key={badge._id} className="group relative flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#3e3e3e] flex items-center justify-center shadow-lg group-hover:border-indigo-500 transition-colors cursor-help`}>
                                        <BadgeIcon name={badge.icon} className={`w-5 h-5 ${getBadgeColor(badge.name)}`} />
                                    </div>
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block w-max bg-black text-white text-xs px-2 py-1 rounded border border-[#3e3e3e] z-20 shadow-xl">
                                        <p className="font-bold">{badge.name}</p>
                                        <p className="text-[10px] text-slate-400">{badge.description}</p>
                                    </div>
                                </div>
                            ))}
                            {Array.from({ length: Math.max(0, 8 - (user.badges?.length || 0)) }).map((_, i) => (
                                <div key={i} className="w-12 h-12 rounded-xl bg-[#1a1a1a]/30 border border-dashed border-[#3e3e3e]"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: ACTIVITY HEATMAP --- */}
                <div className="lg:col-span-2">
                    <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6 h-full flex flex-col">
                        <h3 className="font-bold text-white mb-6">Activity Graph</h3>

                        {/* Simulated Heatmap Grid */}
                        <div className="flex-1 flex gap-1 overflow-x-auto pb-2 custom-scrollbar items-center">
                            {/* Generate 25 weeks */}
                            {Array.from({ length: 25 }).map((_, w) => (
                                <div key={w} className="flex flex-col gap-1">
                                    {/* Generate 7 days */}
                                    {Array.from({ length: 7 }).map((_, d) => {
                                        // Simulated Data: Randomly active
                                        const intensity = Math.random() > 0.7 ? Math.ceil(Math.random() * 4) : 0;
                                        const colors = [
                                            "bg-[#3e3e3e]",       // 0
                                            "bg-emerald-900/80",  // 1
                                            "bg-emerald-700",     // 2
                                            "bg-emerald-500",     // 3
                                            "bg-emerald-400"      // 4
                                        ];
                                        return (
                                            <div
                                                key={d}
                                                className={`w-3.5 h-3.5 rounded-sm ${colors[intensity]} hover:ring-1 ring-white/50 transition-all`}
                                                title={`${intensity} submissions`}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-6 justify-end">
                            <span>Less</span>
                            <div className="w-3 h-3 bg-[#3e3e3e] rounded-sm"></div>
                            <div className="w-3 h-3 bg-emerald-900 rounded-sm"></div>
                            <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                            <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- Helper Components ---

function BadgeIcon({ name, className }: { name: string, className?: string }) {
    const iconMap: any = {
        "Star": Star,
        "Zap": Zap,
        "Crown": Crown,
        "Flame": Flame,
        "Trophy": Trophy,
        "Target": Target,
        "Award": Award
    };
    const Icon = iconMap[name] || Trophy;
    return <Icon className={className} />;
}

function getBadgeColor(name: string) {
    if (name.includes("Gold") || name.includes("Master") || name.includes("Legend")) return "text-yellow-400";
    if (name.includes("Silver") || name.includes("Expert")) return "text-slate-300";
    if (name.includes("Bronze") || name.includes("Apprentice")) return "text-orange-400";
    return "text-indigo-400";
}