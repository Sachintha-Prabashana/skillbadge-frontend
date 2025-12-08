import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { X, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function SuccessModal({ onClose, points }: { onClose: () => void, points: number }) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} gravity={0.2} />

            <div className="bg-[#1a1a1a] border border-[#2cbb5d] w-full max-w-md rounded-2xl p-8 text-center relative shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>

                <div className="w-20 h-20 bg-[#2cbb5d]/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-[#2cbb5d]/20">
                    <CheckCircle2 className="w-10 h-10 text-[#2cbb5d]" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">Success!</h2>
                <p className="text-slate-400 mb-8">You passed all test cases.</p>

                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-[#282828] px-6 py-3 rounded-xl border border-[#3e3e3e] flex items-center gap-2">
                        <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold text-white">+{points} XP</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link to="/dashboard" className="w-full bg-[#2cbb5d] hover:bg-[#25a04e] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                        Back to Dashboard <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button onClick={onClose} className="w-full text-slate-400 hover:text-white py-2 text-sm">
                        Stay here and optimize code
                    </button>
                </div>
            </div>
        </div>
    );
}