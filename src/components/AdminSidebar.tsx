
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Code2,
    Users,
    Settings,
    LogOut,
    Terminal
} from "lucide-react";
import {logout} from "../services/auth.ts";

const MENU_ITEMS = [
    { name: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Challenges", icon: Code2, path: "/admin/challenge" },
    { name: "Students", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <aside className="w-64 bg-[#0e141e] text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-50">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl tracking-tight">
                    <Terminal className="w-6 h-6" />
                    <span>SkillBadge</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname.includes(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
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

            {/* User / Logout */}
            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/10 transition text-sm font-medium
                "  onClick={logout}>

                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}