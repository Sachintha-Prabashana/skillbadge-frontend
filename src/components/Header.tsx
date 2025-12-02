import React from "react"
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-8 sticky top-0 z-10 font-['Satoshi',_sans-serif]">

            {/* Search Bar */}
            <div className="relative w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-500"
                />
            </div>

            {/* Center Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <Link to="#" className="hover:text-white transition-colors">Challenges</Link>
                <Link to="#" className="hover:text-white transition-colors">Contests</Link>
                <Link to="#" className="hover:text-white transition-colors">Practice</Link>
                <Link to="#" className="hover:text-white transition-colors">Community</Link>
                <Link to="#" className="hover:text-white transition-colors">Leaderboard</Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#121212]"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
                    <img src="https://i.pravatar.cc/150?u=alex" alt="User" />
                </div>
            </div>
        </header>
    );
}