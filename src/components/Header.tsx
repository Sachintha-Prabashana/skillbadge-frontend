import { useState, useRef, useEffect } from "react"; // Added useEffect
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, ShoppingBag, LogOut, List, TrendingUp, Settings, Menu } from "lucide-react";
import { useAuth } from "../context/authContext.tsx";
import { useSidebar } from "../context/SidebarContext"; 

export default function Header() {
    const location = useLocation();
    const { user } = useAuth();
    const { toggleSidebar } = useSidebar();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // 1. Ref for the dropdown container
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isActive = (path: string) => location.pathname === path ? 'text-amber-500 font-bold' : 'hover:text-white';

    // 2.  CLICK OUTSIDE LOGIC 
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If dropdown is open AND click is NOT inside the dropdown ref
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        // Add listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);
        
        // Cleanup listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 2. Create a handler to manage the logout process
    const handleLogout = () => {
        setIsDropdownOpen(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        window.location.href = "/login";
    };

    return (
        <header className="h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 font-['Satoshi',_sans-serif]">

            {/* LEFT: Menu & Search */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative w-64 hidden sm:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* CENTER: Navigation */}
            <nav className="hidden xl:flex items-center gap-8 text-sm font-medium text-slate-400">
                <Link to="/dashboard" className={isActive('/dashboard')}>Challenges</Link>
                <Link to="/discuss" className={isActive('/discuss')}>Discuss</Link>
                <Link to="/contest/live" className={isActive('/contests')}>Contests</Link>
                <Link to="/leaderboard" className={isActive('/leaderboard')}>Leaderboard</Link>
            </nav>

            {/* RIGHT: User Actions */}
            <div className="flex items-center gap-3 md:gap-4">
                <button className="sm:hidden p-2 text-slate-400 hover:text-white">
                    <Search className="w-5 h-5" />
                </button>

                <Link to="/store" className="hidden xs:flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full hover:border-amber-500/50 transition-colors group">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-bold text-amber-500 font-mono">{user?.points || 0} XP</span>
                </Link>

                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#121212]"></span>
                </button>

                {/* --- 3. Attach Ref to the Dropdown Container --- */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-[#2a2a2a] hover:border-white transition-colors">
                            {user?.avatarUrl ? 
                                <img src={user.avatarUrl} className="w-full h-full object-cover"/> : 
                                <div className="w-full h-full flex items-center justify-center text-xs text-white font-bold">{user?.firstname?.[0]}</div>
                            }
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            
                            {/* Header */}
                            <div className="border-b border-[#2a2a2a] bg-[#222]">
                                <Link
                                    to="/profile/me"
                                    onClick={() => setIsDropdownOpen(false)}
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

                            {/* Menu Items */}
                            <div className="p-2 space-y-1">
                                <Link to="/lists" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors">
                                    <List className="w-4 h-4 text-slate-400" /> My Lists
                                </Link>
                                <Link to="/profile/me" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Progress
                                </Link>
                                <Link to="/profile/me/settings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors">
                                    <Settings className="w-4 h-4 text-slate-400" /> Profile Settings
                                </Link>
                            </div>

                            {/* Footer */}
                            <div className="p-2 border-t border-[#2a2a2a]">
                                <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}