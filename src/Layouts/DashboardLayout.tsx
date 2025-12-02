import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Slidebar from "../components/Slidebar.tsx";

export default function Layout() {
    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Sidebar */}
            <Slidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col h-full w-full">
                <Header />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}