import { Bot, Loader2, Sparkles, Code2, Zap } from "lucide-react";

interface Props {
    stream: string;
    setStream: (v: string) => void;
    difficulty: string;
    setDifficulty: (v: string) => void;
    onStart: () => void;
    loading: boolean;
}

export default function InterviewSetup({ stream, setStream, difficulty, setDifficulty, onStart, loading }: Props) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans text-white relative overflow-hidden">

            {/* Background Glows (SkillBadge Theme: Orange & Amber) */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Main Card */}
            <div className="bg-[#0f0f0f] border border-[#262626] p-8 rounded-3xl max-w-md w-full shadow-2xl relative z-10 backdrop-blur-xl">

                {/* Header Icon */}
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-6 mx-auto border border-[#333] shadow-[0_0_20px_rgba(249,115,22,0.15)] group hover:border-orange-500/50 transition-colors">
                    <Bot className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                </div>

                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">
                        Mock Interview
                    </h1>
                    <p className="text-zinc-500 text-sm flex items-center justify-center gap-2 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Master your tech stack
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Topic Input */}
                    <div className="group">
                        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-2.5 ml-1">
                            Topic / Tech Stack
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center border border-[#333]">
                                <Code2 className="w-4 h-4 text-orange-500" />
                            </div>
                            <input
                                type="text"
                                value={stream}
                                onChange={(e) => setStream(e.target.value)}
                                placeholder="e.g. React, Node.js, System Design"
                                className="w-full bg-[#0a0a0a] border border-[#262626] text-white pl-14 pr-4 py-4 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-zinc-700 text-sm font-medium group-hover:border-[#404040]"
                            />
                        </div>
                    </div>

                    {/* Difficulty Selector */}
                    <div>
                        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-2.5 ml-1">
                            Difficulty Level
                        </label>
                        <div className="grid grid-cols-3 gap-2 bg-[#0a0a0a] p-1.5 rounded-xl border border-[#262626]">
                            {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setDifficulty(level)}
                                    className={`relative py-2.5 text-xs font-bold rounded-lg transition-all duration-300 overflow-hidden ${
                                        difficulty === level
                                            ? 'text-white shadow-lg shadow-orange-500/20'
                                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1a1a1a]'
                                    }`}
                                >
                                    {/* Active Background Animation */}
                                    {difficulty === level && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 -z-10" />
                                    )}
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={onStart}
                        disabled={loading || !stream}
                        className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all mt-2 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin text-zinc-600" />
                                <span className="text-zinc-800">Setting up Environment...</span>
                            </>
                        ) : (
                            <>
                                <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <Zap className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
                                <span>Start Interview Session</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Footer Text */}
            <p className="absolute bottom-8 text-zinc-700 text-xs font-mono">
                POWERED BY SKILLBADGE AI - YOUR ULTIMATE INTERVIEW COACH
            </p>
        </div>
    );
}