import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar.tsx";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        // 1. Main container uses light background for the content area
        <div className="flex h-screen bg-[#f8f9fc] text-slate-900 font-['Satoshi, _sans-serif'] overflow-hidden">

            {/* 2. Sidebar (Remains Dark internally as defined in AdminSidebar.tsx) */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* 3. Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* 📱 Mobile Header (Dark to match Sidebar) */}
                <header className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-slate-800 bg-[#0e141e] text-white">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-indigo-400">SkillBadge Admin</span>
                    <div className="w-10" /> {/* Spacer */}
                </header>

                {/* 📜 Scrollable Content Area (Light Background) */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}