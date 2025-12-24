import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard, Code2, Users, Settings, LogOut, Terminal, X
} from "lucide-react";
import { logout } from "../services/auth";

const MENU_ITEMS = [
    { name: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Challenges", icon: Code2, path: "/admin/challenge" },
    { name: "Students", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const location = useLocation();

    return (
        <>
            {/* 🌑 MOBILE OVERLAY (Click to close) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* 🟦 SIDEBAR DRAWER */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen w-64 bg-[#0e141e] text-white border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 lg:static
                `}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl tracking-tight">
                        <Terminal className="w-6 h-6" />
                        <span>SkillBadge</span>
                    </div>
                    {/* Close Button (Mobile Only) */}
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {MENU_ITEMS.map((item) => {
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => onClose()} // Close menu when clicking a link on mobile
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/10 transition text-sm font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}