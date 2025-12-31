import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Terminal, Trophy, MessageSquare, Settings, LogOut, List, Layers, Zap, X } from "lucide-react";
import { logout } from "../services/auth";
import { useAuth } from "../context/authContext";
import { useSidebar } from "../context/SidebarContext";
import Logo from "./Logo.tsx"; // Import Context

export default function Sidebar() {
    const location = useLocation();
    const { user } = useAuth();
    const { isOpen, closeSidebar } = useSidebar(); // Get state

    const navSections = [
        {
            title: "MENU",
            items: [
                { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" }
            ]
        },
        {
            title: "COMMUNITY",
            items: [
                { icon: Trophy, label: "Contests", path: "/contest/live" },
                { icon: MessageSquare, label: "Discuss", path: "/discuss" },
                { icon: Zap, label: "Leaderboard", path: "/leaderboard" },
            ]
        }
    ];

    return (
        <>
            {/* Responsive Classes:
               - fixed, z-40: Always on top
               - lg:translate-x-0: Always visible on Large screens (1024px+)
               - ${isOpen ? "translate-x-0" : "-translate-x-full"}: Toggles on Mobile
            */}
            <aside className={`
                w-64 bg-[#121212] border-r border-[#2a2a2a] flex flex-col fixed h-full z-40 font-['Satoshi',_sans-serif] transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>

                {/* --- LOGO & CLOSE BUTTON --- */}
                <div className="h-16 flex items-center justify-between px-6">
                    {/* 2. USE THE LOGO COMPONENT */}
                    <Link to="/dashboard" onClick={closeSidebar}>
                        <Logo className="w-8 h-8" textClassName="text-xl" />
                    </Link>
                    {/* Close Button (Mobile Only) */}
                    <button onClick={closeSidebar} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* --- USER PROFILE --- */}
                <div className="p-6 border-b border-[#27272a] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600 shrink-0">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs bg-gradient-to-br from-indigo-500 to-purple-500">
                                {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="font-bold text-sm text-white truncate">
                            {user?.firstname} {user?.lastname}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                            <Zap className="w-3 h-3 fill-amber-500" />
                            <span>{user?.points || 0} XP</span>
                        </div>
                    </div>
                </div>

                {/* --- NAVIGATION --- */}
                <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
                    {navSections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h4 className="text-xs font-bold text-slate-500 mb-2 px-4 uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <div className="space-y-0.5">
                                {section.items.map((item) => {
                                    const active = location.pathname.startsWith(item.path);
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={closeSidebar} // Close sidebar on click (Mobile UX)
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                active ? "bg-amber-500/10 text-amber-500" : "text-slate-400 hover:text-white hover:bg-[#1e1e1e]"
                                            }`}
                                        >
                                            <item.icon className={`w-4 h-4 ${active ? "text-amber-500" : "text-slate-500 group-hover:text-white"}`} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- BOTTOM ACTIONS --- */}
                <div className="p-4 border-t border-[#2a2a2a] space-y-1">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all text-sm font-medium">
                        <Settings className="w-5 h-5" /> Settings
                    </button>
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
}