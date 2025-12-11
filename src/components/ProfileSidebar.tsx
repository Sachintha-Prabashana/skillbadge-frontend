import React, { useRef, useState, useEffect } from "react";
import {
    Camera, Code2, Github, Layout, Linkedin, Twitter,
    Loader2, MapPin, User, Edit2
} from "lucide-react";
import { Link } from "react-router-dom";
import { uploadAvatar } from "../services/user";
import { useAuth } from "../context/authContext";

interface Props {
    // Basic Info
    username: string;
    rank: number;
    avatarUrl?: string;

    // New Profile Fields
    title?: string;
    about?: string;
    country?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };

    // Stats
    languages: { name: string; problems: number }[];

    // Actions
    onProfileUpdate: () => void;
    isOwnProfile?: boolean; // Optional: Default to true if not passed
}

export default function ProfileSidebar({
                                           username, rank, avatarUrl, languages,
                                           title, about, country, socials, onProfileUpdate, isOwnProfile = true
                                       }: Props) {

    const { refreshUser } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [displayAvatar, setDisplayAvatar] = useState(avatarUrl);

    // Sync state when prop updates (e.g. after initial fetch)
    useEffect(() => {
        setDisplayAvatar(avatarUrl);
    }, [avatarUrl]);

    const handleAvatarClick = () => {
        if (!isUploading && isOwnProfile) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) return alert("Please upload an image file.");
        if (file.size > 2 * 1024 * 1024) return alert("File size too large (Max 2MB).");

        try {
            setIsUploading(true);
            const newAvatarUrl = await uploadAvatar(file);
            setDisplayAvatar(newAvatarUrl); // Local update
            await refreshUser();            // Global context update
            onProfileUpdate();              // Parent data reload
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload profile picture.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-6">

            {/* === 1. IDENTITY CARD === */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 relative group">

                {/* Edit Button (Top Right) */}
                {isOwnProfile && (
                    <Link
                        to="/settings"
                        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-[#252526] rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Edit Profile"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Link>
                )}

                <div className="flex flex-col items-center text-center">

                    {/* Avatar Circle */}
                    <div
                        className={`relative w-24 h-24 mb-4 rounded-full bg-[#252526] border-4 border-[#121212] overflow-hidden shadow-xl ${isOwnProfile ? 'cursor-pointer group/avatar' : ''}`}
                        onClick={handleAvatarClick}
                    >
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                        )}

                        {displayAvatar ? (
                            <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">
                                <User className="w-10 h-10" />
                            </div>
                        )}

                        {/* Hover Overlay for Upload */}
                        {isOwnProfile && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center z-10">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Name & Handle */}
                    <h1 className="text-xl font-bold text-white mb-0.5">
                        {username}
                    </h1>
                    <p className="text-slate-500 text-sm mb-3">@{username}</p>

                    {/* Title/Role */}
                    {title && (
                        <p className="text-indigo-400 text-xs font-bold uppercase tracking-wide mb-4 bg-indigo-500/10 px-3 py-1 rounded-full">
                            {title}
                        </p>
                    )}

                    {/* Rank Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#252526] rounded-full border border-[#3e3e3e] mb-6">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-300">
                            Global Rank <span className="text-white">#{rank}</span>
                        </span>
                    </div>

                    {/* About Section */}
                    {about && (
                        <div className="w-full text-left border-t border-[#2a2a2a] pt-4 mb-4">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">About</h4>
                            <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap font-medium">
                                {about}
                            </p>
                        </div>
                    )}

                    {/* Location */}
                    {country && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-[#252526] px-3 py-1.5 rounded-lg">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {country}
                        </div>
                    )}
                </div>
            </div>

            {/* === 2. SOCIAL LINKS (UPDATED: ICON ONLY ROW) === */}
            {socials && Object.values(socials).some(val => val) && (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                        <Layout className="w-3.5 h-3.5" /> Connect
                    </h3>

                    {/* Horizontal Flex Row */}
                    <div className="flex flex-wrap gap-3">
                        {socials.github && (
                            <a href={socials.github} target="_blank" rel="noreferrer" className="group" title="GitHub">
                                <div className="p-2.5 bg-[#24292e] rounded-lg text-white border border-transparent group-hover:border-slate-500/50 group-hover:scale-105 transition-all shadow-md">
                                    <Github className="w-5 h-5" />
                                </div>
                            </a>
                        )}
                        {socials.linkedin && (
                            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="group" title="LinkedIn">
                                <div className="p-2.5 bg-[#0077b5] rounded-lg text-white border border-transparent group-hover:border-slate-500/50 group-hover:scale-105 transition-all shadow-md">
                                    <Linkedin className="w-5 h-5" />
                                </div>
                            </a>
                        )}
                        {socials.twitter && (
                            <a href={socials.twitter} target="_blank" rel="noreferrer" className="group" title="Twitter">
                                <div className="p-2.5 bg-[#1DA1F2] rounded-lg text-white border border-transparent group-hover:border-slate-500/50 group-hover:scale-105 transition-all shadow-md">
                                    <Twitter className="w-5 h-5" />
                                </div>
                            </a>
                        )}
                        {socials.website && (
                            <a href={socials.website} target="_blank" rel="noreferrer" className="group" title="Portfolio">
                                <div className="p-2.5 bg-emerald-600 rounded-lg text-white border border-transparent group-hover:border-slate-500/50 group-hover:scale-105 transition-all shadow-md">
                                    <Layout className="w-5 h-5" />
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* === 3. LANGUAGES CARD === */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
                <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" /> Languages
                </h3>
                <div className="space-y-4">
                    {languages.length > 0 ? (
                        languages.map((lang, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{lang.name}</span>
                                    <span className="text-slate-500">{lang.problems} solved</span>
                                </div>
                                {/* Simple Progress Bar visual */}
                                <div className="w-full h-1.5 bg-[#252526] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                                        style={{ width: `${Math.min((lang.problems / 20) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-xs text-slate-600 italic">No activity yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}