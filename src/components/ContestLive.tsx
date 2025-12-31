import { Link } from "react-router-dom";
import { Construction, ArrowLeft, Trophy } from "lucide-react";

export default function ContestLive() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">

            {/* Icon Container */}
            <div className="w-24 h-24 bg-[#1a1a1a] border border-[#3e3e3e] rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl"></div>
                <Trophy className="w-10 h-10 text-slate-600" />
                <div className="absolute -bottom-2 -right-2 bg-[#282828] p-2 rounded-full border border-[#3e3e3e]">
                    <Construction className="w-5 h-5 text-yellow-500" />
                </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-3">
                Weekly Contests
            </h1>

            {/* Subtitle / Message */}
            <p className="text-slate-400 max-w-md mb-8">
                This feature is currently under development. In the future, you will be able to compete against other developers in real-time.
            </p>

            {/* Action Button */}
            <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-3 bg-[#282828] hover:bg-[#3e3e3e] border border-[#3e3e3e] rounded-xl text-white font-medium transition-all"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

        </div>
    )
}