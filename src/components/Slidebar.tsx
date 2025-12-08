import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Code2,
    Database,
    FileCode,
    Settings,
    LogOut,
    Terminal, Zap
} from "lucide-react";
import {logout} from "../services/auth.ts";
import { useAuth } from "../context/authContext.tsx";

export default function Slidebar() {
    const location = useLocation();
    const { user } = useAuth()

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Code2, label: "Algorithms", path: "/algorithms" },
        { icon: Database, label: "Data Structures", path: "/data-structures" },
        { icon: FileCode, label: "SQL", path: "/sql" },
    ];

    return (
        <aside className="w-64 bg-[#121212] border-r border-[#2a2a2a] flex flex-col fixed h-full z-20 font-['Satoshi',_sans-serif]">

            {/* --- LOGO --- */}
            <div className="h-16 flex items-center px-6">
                <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
                    <div className="bg-amber-500 p-1 rounded">
                        <Terminal className="w-5 h-5 text-black" />
                    </div>
                    <span>CodeRank</span>
                </div>
            </div>

            {/* --- USER PROFILE (Lightweight Data) --- */}
            <div className="p-6 border-b border-[#27272a] flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600">
                        {/* 1. Try Avatar URL */}
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            /* 2. Fallback to Initials (No API call needed) */
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                                {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm text-white">
                        {user?.firstname} {user?.lastname}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-purple-400 font-medium">
                        <Zap className="w-3 h-3" />
                        <span>{user?.points || 0} XP</span>

                    </div>
                </div>
            </div>



            {/* --- NAVIGATION --- */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-[#1a1a1a]"
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-amber-500" : "text-slate-500"}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* --- BOTTOM --- */}
            <div className="p-4 border-t border-[#2a2a2a] space-y-1">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all text-sm font-medium">
                    <Settings className="w-5 h-5" /> Settings
                </button>

                {/* UPDATE THIS BUTTON */}
                <button
                    onClick={logout} // <--- Attach the handler here
                    className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>
        </aside>
    );
}