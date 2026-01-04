import { Link } from "react-router-dom";
import {
    ChevronLeft,
    List,
    Settings,
    Sparkles,
    Timer
} from "lucide-react";

interface Props {
    title?: string;
    onAiClick: () => void;
}

export default function SolverHeader({ title, onAiClick }: Props) {
    return (
        <header className="h-14 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center justify-between px-4 shrink-0 font-['Satoshi',_sans-serif]">

            {/* --- LEFT: NAVIGATION --- */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Back Button */}
                <Link
                    to="/dashboard"
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-[#2a2a2a] transition-all"
                    title="Back to Dashboard"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>

                <div className="h-5 w-px bg-[#2a2a2a] hidden sm:block"></div>

                {/* Problem List Dropdown Trigger */}
                <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group">
                    <List className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    <span className="hidden sm:inline">Problem List</span>
                </button>

                {/* Title (Hidden on small screens to save space) */}
                {title && (
                    <>
                        <div className="h-5 w-px bg-[#2a2a2a] hidden lg:block"></div>
                        <span className="text-sm font-bold text-white hidden lg:block truncate max-w-[200px]">
                            {title}
                        </span>
                    </>
                )}
            </div>

            {/* --- CENTER: TIMER (Hidden on mobile) --- */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-[#222] rounded-full border border-[#2a2a2a]">
                <Timer className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-mono text-slate-300">00:00:00</span>
            </div>

            {/* --- RIGHT: TOOLS & AI --- */}
            <div className="flex items-center gap-2 sm:gap-3">

                {/*  AI ASSISTANT BUTTON (RESPONSIVE)  */}
                <button
                    onClick={onAiClick}
                    className="flex items-center justify-center gap-2 px-2 sm:px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 rounded-lg transition-all group"
                    title="Ask AI Coach"
                >
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {/* Text hidden on small screens (<640px) */}
                    <span className="text-xs font-bold hidden sm:inline">Ask AI</span>
                </button>

                {/* Divider */}
                <div className="h-5 w-px bg-[#2a2a2a]"></div>

                {/* Settings */}
                <button className="p-2 text-slate-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors">
                    <Settings className="w-4.5 h-4.5" />
                </button>

                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500/30 flex items-center justify-center text-xs font-bold text-white shadow-sm cursor-pointer hover:ring-2 ring-slate-700 transition-all">
                    U
                </div>
            </div>
        </header>
    );
}