import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { X, Sparkles, Bot, User } from "lucide-react";
import { getChallengeHint } from "../services/challenge.ts";
import { useAuth } from "../context/authContext.tsx";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    challengeId: string;
    code: string;
    language: string;
}

interface Message {
    role: "user" | "ai";
    content: string;
}

export default function AiAssistant({ isOpen, onClose, challengeId, code, language }: Props) {
    const { user, updateUser } = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Hi! I'm your coding coach. Stuck? I can give you a hint for 5 XP." }
    ]);
    const [loading, setLoading] = useState(false);

    const XP_COST = 5;

    // --- Auto-scroll to bottom when messages change ---
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleAskHint = async () => {
        if (!user) return;

        // Safety check
        if (user.points < XP_COST) {
            setMessages(prev => [...prev, { role: "ai", content: "You don't have enough XP for a hint!" }]);
            return;
        }

        setLoading(true);
        const previousPoints = user.points;

        // Optimistic UI Update
        updateUser({ points: user.points - XP_COST });
        setMessages(prev => [...prev, { role: "user", content: "Can you give me a hint based on my code?" }]);

        try {
            const data = await getChallengeHint(challengeId, code, language);

            if (data.remainingPoints !== undefined) {
                updateUser({ points: data.remainingPoints });
            }

            setMessages(prev => [...prev, { role: "ai", content: data.hint }]);

        } catch (error: any) {
            console.error("Hint failed:", error);
            updateUser({ points: previousPoints }); // Rollback points
            setMessages(prev => [...prev, {
                role: "ai",
                content: error.response?.data?.message || "Sorry, I couldn't reach the server. Points refunded."
            }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        // --- Responsive Container ---
        // 1. top-14: Starts exactly below SolverHeader (h-14)
        // 2. w-full md:w-96: Full width on mobile, Fixed width sidebar on Desktop
        <div className="absolute top-14 bottom-0 right-0 w-full md:w-96 bg-[#1e1e1e] border-l border-[#3e3e3e] shadow-2xl z-40 flex flex-col animate-in slide-in-from-right duration-300">

            {/* --- Header --- */}
            <div className="h-12 border-b border-[#3e3e3e] flex items-center justify-between px-4 bg-[#252526] shrink-0">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <Sparkles className="w-4 h-4" /> AI Coach
                </div>
                <button 
                    onClick={onClose} 
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3e3e3e] rounded-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* --- Chat Area --- */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#1e1e1e]"
            >
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-300'}`}>
                            {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        
                        {/* Bubble */}
                        <div className={`p-3 rounded-xl text-sm max-w-[85%] leading-relaxed ${msg.role === 'ai' ? 'bg-[#2a2a2a] text-slate-200' : 'bg-indigo-600 text-white'}`}>
                            {msg.role === 'ai' ? (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>
                            ) : (
                                msg.content
                            )}
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex gap-3 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-[#2a2a2a] p-3 rounded-xl text-sm text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Input Area (Gamified) --- */}
            <div className="p-4 border-t border-[#3e3e3e] bg-[#252526] shrink-0 pb-6 md:pb-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Hint Cost</span>
                        <span className="text-amber-500 font-bold flex items-center gap-1">
                            5 XP
                        </span>
                    </div>
                    
                    <button
                        onClick={handleAskHint}
                        disabled={loading || !code.trim() || (user?.points || 0) < XP_COST}
                        className={`
                            w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]
                            ${(user?.points || 0) < XP_COST
                            ? "bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"}
                        `}
                    >
                        {loading ? "Analyzing Code..." : (
                            <>
                                <Sparkles className="w-4 h-4" /> 
                                {(user?.points || 0) < XP_COST ? "Not Enough XP" : "Generate Hint"}
                            </>
                        )}
                    </button>
                    
                    {(user?.points || 0) < XP_COST && (
                        <p className="text-[10px] text-red-400 text-center">
                            You need {XP_COST - (user?.points || 0)} more XP. Try solving easier problems first!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}