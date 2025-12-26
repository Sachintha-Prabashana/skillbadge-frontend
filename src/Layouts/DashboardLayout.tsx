import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Slidebar.tsx"; // Fixed typo Slidebar -> Sidebar
import { SidebarProvider, useSidebar } from "../context/SidebarContext";

function DashboardLayoutContent() {
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-['Satoshi',_sans-serif]">

            {/* Sidebar (Responsive) */}
            <Sidebar />

            {/* Mobile Overlay (Darkens background when sidebar is open) */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
                />
            )}

            {/* Main Content Area */}
            {/* lg:ml-64 ensures space for sidebar on Desktop. ml-0 on mobile. */}
            <div className="flex-1 lg:ml-64 flex flex-col h-full w-full transition-all duration-300">
                <Header />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

// Wrap with Provider
export default function Layout() {
    return (
        <SidebarProvider>
            <DashboardLayoutContent />
        </SidebarProvider>
    );
}