import { useState, useRef, useEffect } from "react";
import "regenerator-runtime/runtime";
import { ArrowLeft, Volume2, VolumeX, Loader2 } from "lucide-react";

// Components
import InterviewSetup from "../components/InterviewSetup";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";

// Services & Hooks
import { startMockInterview, sendInterviewReply } from "../services/interview";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

interface Message {
    role: "assistant" | "user";
    content: string;
}

export default function MockInterview() {
    const [step, setStep] = useState<"SETUP" | "CHAT">("SETUP");
    const [stream, setStream] = useState("React.js");
    const [difficulty, setDifficulty] = useState("Intermediate");

    const [interviewId, setInterviewId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    // Voice Settings
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { speak, stop } = useTextToSpeech(soundEnabled);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // AI Speaks when new assistant message arrives
    useEffect(() => {
        if (messages.length > 0 && step === 'CHAT') {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.role === 'assistant') {
                speak(lastMsg.content);
            }
        }
    }, [messages, step, speak]);

    // --- HANDLERS ---
    const handleStart = async () => {
        setLoading(true);
        try {
            const data = await startMockInterview(stream, difficulty);
            setInterviewId(data.interviewId);
            setMessages([{ role: "assistant", content: data.message }]);
            setStep("CHAT");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to start");
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (userMsg: string) => {
        if (!interviewId) return;

        stop(); // Stop AI speaking if user interrupts
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const data = await sendInterviewReply(interviewId, userMsg);
            setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER ---
    if (step === "SETUP") {
        return (
            <InterviewSetup
                stream={stream}
                setStream={setStream}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                loading={loading}
                onStart={handleStart}
            />
        );
    }

    return (
        <div className="h-screen bg-[#050505] flex flex-col font-sans text-white overflow-hidden">

            {/* Header */}
            <header className="h-16 border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setStep("SETUP")}
                        className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-[#1a1a1a] rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="font-bold text-sm md:text-base text-white tracking-tight">{stream} Interview</h3>
                        <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Live Session
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Sound Toggle */}
                    <button
                        onClick={() => {
                            if(soundEnabled) stop();
                            setSoundEnabled(!soundEnabled);
                        }}
                        className={`p-2.5 rounded-lg border transition-all ${
                            soundEnabled
                                ? 'text-orange-500 border-orange-500/20 bg-orange-500/10'
                                : 'text-zinc-500 border-[#262626] bg-[#1a1a1a] hover:text-zinc-300'
                        }`}
                        title={soundEnabled ? "Mute AI" : "Unmute AI"}
                    >
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    <button
                        onClick={() => { if(confirm("End session?")) { stop(); setStep("SETUP"); }}}
                        className="text-xs font-bold text-red-400 bg-red-500/10 px-4 py-2.5 rounded-lg hover:bg-red-500/20 border border-red-500/10 transition-colors"
                    >
                        End Session
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] bg-[#050505]">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} role={msg.role} content={msg.content} />
                ))}

                {/* Loading Indicator (The "Thinking" Bubble) */}
                {loading && (
                    <div className="flex gap-4 animate-in fade-in duration-300">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                            <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                        </div>
                        <div className="flex items-center gap-1 text-zinc-500 text-sm font-medium">
                            <span className="animate-pulse">Thinking</span>
                            <span className="animate-bounce delay-75">.</span>
                            <span className="animate-bounce delay-150">.</span>
                            <span className="animate-bounce delay-300">.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={handleSend} loading={loading} />
        </div>
    );
}