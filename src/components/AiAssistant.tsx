import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { X, Sparkles, Send, Bot, User } from "lucide-react";
import { getChallengeHint } from "../services/challenge.ts";
import {useAuth} from "../context/authContext.tsx";

interface UserType {
    _id: string;
    points: number;
    [key: string]: any;
}

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

    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Hi! I'm your coding coach. Stuck? I can give you a hint for 5 XP." }
    ]);
    const [loading, setLoading] = useState(false);

    const XP_COST = 5;

    const handleAskHint = async () => {

        // 1. Validation
        if (!user) return;
        if (user.points < XP_COST) {
            setMessages(prev => [...prev, { role: "ai", content: "You don't have enough XP for a hint!" }]);
            return;
        }

        setLoading(true);

        // 2. SNAPSHOT (Save current points)
        const previousPoints = user.points;

        // 3. OPTIMISTIC UPDATE (Global)
        // This updates the Context immediately -> Header updates instantly
        updateUser({ points: user.points - XP_COST });


        // Add user request to UI
        const newMessages = [...messages, { role: "user", content: "Can you give me a hint based on my code?" } as Message];
        setMessages(newMessages);

        try {
            const data = await getChallengeHint(challengeId, code, language);

            // Add AI response
            setMessages(prev => [...prev, { role: "ai", content: data.hint }]);

            // Optional: If backend returns the exact remaining points, sync it here
            // if (data.remainingPoints) {
            //     setUser(prev => prev ? { ...prev, points: data.remainingPoints } : null);
            // }
        } catch (error: any) {
            // 5. ROLLBACK (If API fails, give points back globally)
            updateUser({ points: previousPoints });

            setMessages(prev => [...prev, {
                role: "ai",
                content: error.response?.data?.message || "Sorry, I couldn't reach the server."
            }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-12 bottom-0 right-0 w-96 bg-[#1e1e1e] border-l border-[#3e3e3e] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">

            {/* --- Header --- */}
            <div className="h-12 border-b border-[#3e3e3e] flex items-center justify-between px-4 bg-[#252526]">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <Sparkles className="w-4 h-4" /> AI Coach
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* --- Chat Area --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-300'}`}>
                            {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={`p-3 rounded-xl text-sm max-w-[80%] ${msg.role === 'ai' ? 'bg-[#2a2a2a] text-slate-200' : 'bg-indigo-600 text-white'}`}>
                            {msg.role === 'ai' ? (
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            ) : (
                                msg.content
                            )}
                        </div>
                    </div>
                ))}

                {/* Loading Bubble */}
                {loading && (
                    <div className="flex gap-3">
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
            <div className="p-4 border-t border-[#3e3e3e] bg-[#252526]">
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-center text-slate-500 mb-2">
                        Asking for a hint costs <span className="text-amber-500 font-bold">5 XP</span>
                    </p>
                    <button
                        onClick={handleAskHint}
                        disabled={loading || !code.trim() || (user?.points || 0) < XP_COST}
                        className={`
                            w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg
                            ${(user?.points || 0) < XP_COST
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"}
                        `}
                    >
                        {loading ? "Analyzing Code..." : (
                            <>
                                <Sparkles className="w-4 h-4" /> Generate Hint
                            </>
                        )}
                    </button>
                    {(user?.points || 0) < XP_COST && (
                        <p className="text-[10px] text-red-400 text-center">Not enough XP!</p>
                    )}

                </div>
            </div>
        </div>
    );
}