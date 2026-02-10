import { useState, useEffect } from 'react';
import { Send, Mic, Loader2, MicOff } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Props {
    onSend: (message: string) => void;
    loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
    const [input, setInput] = useState('');

    // Speech Recognition Hooks
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition

    } = useSpeechRecognition();

    // Sync transcript with input when listening stops
    useEffect(() => {
        if (transcript) {
            setInput(transcript);
        }
    }, [transcript]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput('');
        resetTranscript();

    }

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening()
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true, language: 'en-US' })
        }
    }

    if (!browserSupportsSpeechRecognition) {
        console.warn("Browser does not support speech recognition");
    }

    return (
        <div className="p-4 md:p-6 bg-[#141414] border-t border-[#2a2a2a] shrink-0">
            <div className="max-w-4xl mx-auto relative flex gap-3 items-end">

                {/* Input Wrapper */}
                <div className={`flex-1 bg-[#0a0a0a] border rounded-xl flex items-center p-1 transition-all ${listening ? 'border-red-500/50 ring-1 ring-red-500/20' : 'border-[#2a2a2a] focus-within:border-indigo-500/50'}`}>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={listening ? "Listening... (Speak now)" : "Type your answer here..."}
                        disabled={loading}
                        rows={1}
                        className="w-full bg-transparent text-white px-4 py-3 outline-none resize-none max-h-32 placeholder:text-slate-600 custom-scrollbar"
                        style={{ minHeight: '48px' }}
                    />

                    {/* 🎤 Voice Button */}
                    <button
                        onClick={toggleListening}
                        className={`p-3 mr-1 rounded-lg transition-all ${
                            listening
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'text-slate-500 hover:text-indigo-400 hover:bg-[#1a1a1a]'
                        }`}
                        title="Toggle Voice Input"
                    >
                        {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                </div>

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="h-[50px] w-[50px] bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-lg flex items-center justify-center shrink-0"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                </button>
            </div>

            <p className="text-center text-[10px] text-slate-600 mt-3 font-medium">
                {listening ? <span className="text-red-400">Listening to your voice...</span> : <span>Use Shift + Enter for new line</span>}
            </p>
        </div>
    );
}