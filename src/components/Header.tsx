import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, ShoppingBag, LogOut, User, List, TrendingUp, Settings, ChevronDown } from "lucide-react";
import {useAuth} from "../context/authContext.tsx";


export default function Header() {
    const location = useLocation();
    const { user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Helper to check active state
    const isActive = (path: string) => location.pathname === path ? 'text-amber-500 font-bold' : 'hover:text-white';

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-8 sticky top-0 z-40 font-['Satoshi',_sans-serif]">

            {/* Search Bar */}
            <div className="relative w-96 hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-500"
                />
            </div>

            {/* Center Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <Link to="/dashboard" className={isActive('/dashboard')}>Challenges</Link>
                <Link to="/learn" className={isActive('/learn')}>Learn</Link>
                <Link to="/discuss" className={isActive('/discuss')}>Discuss</Link>
                <Link to="/contest/live" className={isActive('/contests')}>Contests</Link>
                <Link to="/leaderboard" className={isActive('/leaderboard')}>Leaderboard</Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">

                {/* Points Display */}
                <Link to="/store" className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full hover:border-amber-500/50 transition-colors group">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-amber-500 font-mono">{user?.points || 0} XP</span>
                </Link>

                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#121212]"></span>
                </button>

                {/* --- AVATAR DROPDOWN --- */}
                <div className="relative" ref={dropdownRef}>

                    {/* Trigger Button */}
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 focus:outline-none group"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 group-hover:border-amber-500 transition-colors overflow-hidden">
                            {user?.avatarUrl ? (
                                <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-300 uppercase">
                                    {user?.firstname?.charAt(0) || "U"}
                                </div>
                            )}
                        </div>
                        {/* Optional Chevron for UX */}
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                            {/* 1. Header: Avatar & Name - NOW CLICKABLE */}
                            <div className="border-b border-[#2a2a2a] bg-[#222]">
                                <Link
                                    to="/profile/me"
                                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                    className="flex items-center gap-3 p-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-slate-600 shrink-0">
                                        {user?.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-300 uppercase">
                                                {user?.firstname?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-white font-bold text-sm truncate">
                                            {user?.firstname} {user?.lastname}
                                        </h4>
                                        <p className="text-slate-500 text-xs truncate">
                                            @{user?.firstname?.toLowerCase()}{user?.lastname?.toLowerCase()}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            {/* 2. Menu Items */}
                            <div className="p-2 space-y-1">
                                <Link
                                    to="/lists"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                >
                                    <List className="w-4 h-4 text-slate-400" />
                                    My Lists
                                </Link>

                                <Link
                                    to="/profile/me"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                >
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    Progress
                                </Link>

                                <Link
                                    to="/profile/me/settings"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                >
                                    <Settings className="w-4 h-4 text-slate-400" />
                                    Profile Settings
                                </Link>
                            </div>

                            {/* 3. Footer: Sign Out */}
                            <div className="p-2 border-t border-[#2a2a2a]">
                                <button
                                    // onClick={logout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}