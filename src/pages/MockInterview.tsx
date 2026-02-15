import { useState, useRef, useEffect } from "react";
import "regenerator-runtime/runtime";
import { ArrowLeft, Volume2, VolumeX, Loader2, CheckCircle2 } from "lucide-react";

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
    // --- STATES ---
    const [step, setStep] = useState<"SETUP" | "CHAT">("SETUP");
    const [stream, setStream] = useState("React.js");
    const [difficulty, setDifficulty] = useState("Intermediate");

    const [interviewId, setInterviewId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    // Progress States
    const [questionCount, setQuestionCount] = useState(1);
    const [totalQuestions, setTotalQuestions] = useState(10);
    const [isCompleted, setIsCompleted] = useState(false);

    // Voice Settings
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { speak, stop } = useTextToSpeech(soundEnabled);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Reset Function: Clears all session data
    const resetInterview = () => {
        stop(); // Stop any ongoing speech
        setStep("SETUP");
        setMessages([]);
        setInterviewId(null);
        setIsCompleted(false);
        setQuestionCount(1);
        setTotalQuestions(10);
        setLoading(false);
    };

    // Reset on Mount (Fixes the issue of old data persisting)
    useEffect(() => {
        resetInterview();
    }, []);

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
        // Ensure clean state before starting
        setIsCompleted(false);
        setQuestionCount(1);
        setMessages([]);

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
            // Send reply to backend
            const data = await sendInterviewReply(interviewId, userMsg, false);
            setMessages(prev => [...prev, { role: "assistant", content: data.message }]);

            // Update Progress
            if (data.currentQuestion) {
                setQuestionCount(data.currentQuestion);
                console.log("Current Question:", data.currentQuestion);
            }

            if (data.totalQuestions) {
                setTotalQuestions(data.totalQuestions);
            }

            // Check Completion
            if (data.isCompleted) {
                setIsCompleted(true);
                stop();
            }

        } catch (error) {
            console.error("Error sending reply:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleManualStop = async () => {
        if (!interviewId || isCompleted) return;

        if (!confirm("Are you sure you want to end the interview now? You will get a final report.")) return;

        stop();
        setLoading(true);

        try {
            // Send `stop: true` to backend
            const data = await sendInterviewReply(interviewId, "", true);

            // Show Final Report
            setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
            setIsCompleted(true);
            setQuestionCount(totalQuestions); // Max out progress bar

        } catch (error) {
            console.error("Failed to stop session:", error);
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
                    {/* Back Button calls Reset */}
                    <button
                        onClick={resetInterview}
                        className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-[#1a1a1a] rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="font-bold text-sm md:text-base text-white tracking-tight">{stream} Interview</h3>
                        {/* Dynamic Status Label */}
                        {isCompleted ? (
                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                        ) : (
                            <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                Live Session
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress Bar (Only show if not completed) */}
                {!isCompleted && (
                    <div className="hidden md:flex flex-col items-end mr-4">
                         <span className="text-[10px] font-mono text-zinc-500 mb-1">
                             Question {Math.min(questionCount, totalQuestions)} / {totalQuestions}
                         </span>
                        <div className="w-32 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#262626]">
                            <div
                                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500 ease-out"
                                style={{ width: `${(Math.min(questionCount, totalQuestions) / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

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

                    {/* End Session Button */}
                    {!isCompleted && (
                        <button
                            onClick={handleManualStop}
                            className="text-xs font-bold text-red-400 bg-red-500/10 px-4 py-2.5 rounded-lg hover:bg-red-500/20 border border-red-500/10 transition-colors"
                        >
                            End Session
                        </button>
                    )}
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] bg-[#050505]">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} role={msg.role} content={msg.content} />
                ))}

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

            {/* Completion Screen OR Input Area */}
            {isCompleted ? (
                <div className="p-8 bg-[#0a0a0a] border-t border-[#262626] flex flex-col items-center text-center animate-in slide-in-from-bottom-10">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Interview Completed!</h3>
                    <p className="text-zinc-400 text-sm mb-6 max-w-md">
                        Great job! The AI has generated a final report. Review the feedback above to identify your strengths and areas for improvement.
                    </p>
                    {/* Calls Reset Function to start fresh */}
                    <button
                        onClick={resetInterview}
                        className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Start New Interview
                    </button>
                </div>
            ) : (
                <ChatInput onSend={handleSend} loading={loading} />
            )}
        </div>
    );
}