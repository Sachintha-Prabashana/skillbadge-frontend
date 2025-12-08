import React, { useRef, useState, useEffect } from "react";
import { Camera, Code2, Edit2, Loader2, User } from "lucide-react";
import {uploadAvatar} from "../services/user.ts";
import {useAuth} from "../context/authContext.tsx";
// <--- 1. Import Context

interface Props {
    username: string
    rank: number
    avatarUrl?: string // This comes from the parent (Database)
    languages: { name: string; problems: number }[]
    onProfileUpdate: () => void; // <--- 1. Add this Prop Definition
}

export default function ProfileSidebar({ username, rank, avatarUrl, languages, onProfileUpdate }: Props) {
    const { refreshUser } = useAuth(); // <--- 2. Get the refresh function
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    // 3. Local State for immediate UI update
    // We initialize it with the prop, but we can override it after upload
    const [displayAvatar, setDisplayAvatar] = useState(avatarUrl);

    // Sync state if the prop changes (e.g. when page first loads)
    useEffect(() => {
        setDisplayAvatar(avatarUrl);
    }, [avatarUrl]);

    const handleAvatarClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validations
        if (!file.type.startsWith("image/")) return alert("Please upload an image file.");
        if (file.size > 2 * 1024 * 1024) return alert("File size too large (Max 2MB).");

        try {
            setIsUploading(true);

            // A. Upload to Server
            const newAvatarUrl = await uploadAvatar(file);

            // B. Update THIS Component immediately (Visual Feedback)
            setDisplayAvatar(newAvatarUrl);

            // C. Update Global Context (Navbar, etc.)
            await refreshUser();

            console.log("Global user refreshed");

            // D. Update Parent Profile Page (The Fix)
            onProfileUpdate();


        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload profile picture.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl p-6 space-y-8">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex items-center gap-4 mb-6">

                    {/* Avatar Click Area */}
                    <div className="relative group cursor-pointer shrink-0" onClick={handleAvatarClick}>
                        <div className="w-20 h-20 bg-slate-700 rounded-2xl overflow-hidden border-2 border-[#3e3e3e] relative">

                            {/* Spinner */}
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                            )}

                            {/* Image Logic: Use displayAvatar (Local) instead of avatarUrl (Prop) */}
                            {displayAvatar ? (
                                <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <User className="w-10 h-10" />
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-white">{username}</h1>
                        <p className="text-slate-400 text-sm">Level {Math.floor(rank / 100) + 1} Coder</p>
                        <p className="text-slate-300 font-medium mt-2 font-mono text-sm">
                            Global Rank <span className="text-white font-bold">#{rank}</span>
                        </p>
                    </div>
                </div>

                <button className="w-full py-2.5 bg-[#3e3e3e] hover:bg-[#4e4e4e] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm border border-[#525252]">
                    <Edit2 className="w-3 h-3" /> Edit Profile
                </button>
            </div>

            {/* Languages List */}
            <div>
                <h3 className="text-white font-bold mb-4 border-b border-[#3e3e3e] pb-2 text-sm flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-slate-400" /> Languages
                </h3>
                <div className="space-y-3">
                    {languages.length > 0 ? (
                        languages.map((lang, i) => (
                            <div key={i} className="flex justify-between items-center text-sm group">
                                <span className="px-3 py-1 bg-[#1a1a1a] text-slate-300 rounded-full text-xs font-mono group-hover:text-white transition-colors">
                                    {lang.name}
                                </span>
                                <span className="text-slate-500 text-xs font-bold">
                                    {lang.problems} solved
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-slate-600 italic">No languages used yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}