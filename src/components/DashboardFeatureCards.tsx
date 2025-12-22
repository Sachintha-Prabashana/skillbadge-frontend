import React, { useState } from "react";
import { Flame, Trophy, ArrowRight, BookOpen, Shuffle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDailyChallengeId, fetchRandomChallenge } from "../services/challenge.ts";
import toast from "react-hot-toast";
// Make sure you import BOTH functions


export default function DashboardFeatureCards() {
    const navigate = useNavigate();

    // State for Daily Challenge (Initialize FALSE because we wait for click)
    const [loadingDaily, setLoadingDaily] = useState(false);

    // State for Random Challenge
    const [loadingRandom, setLoadingRandom] = useState(false);

    // --- 1. Handle Daily Challenge Click ---
    const handleDailyClick = async () => {
        if (loadingDaily) return; // Prevent double clicks

        try {
            setLoadingDaily(true);

            // Ask Backend for today's ID
            const challengeId = await fetchDailyChallengeId();

            if (challengeId) {
                navigate(`/challenges/${challengeId}`);
            }
        } catch (error) {
            console.error("Failed to start daily challenge", error);
        } finally {
            setLoadingDaily(false);
        }
    };

    // --- 2. Handle Random Challenge Click ---
    const handleRandomPick = async () => {
        if (loadingRandom) return;

        try {
            setLoadingRandom(true);

            // A. Ask Backend for a random ID (This takes ~200ms)
            const data = await fetchRandomChallenge();

            if (data.allSolved) {
                // 🎉 SHOW TOAST HERE
                // alert("🏆 Amazing! You have completed all challenges! Here is a random practice problem.");
                // Example if you use a library:
                toast.success("You've solved everything! Reviewing old problems now.");
            }

            // B. Navigate directly to the specific problem
            // Updated to correct path: /challenges/
            if (data && data._id) {
                console.log(data, data._id);
                navigate(`/challenges/${data._id}`);
            }
        } catch (error) {
            console.error("Failed to pick random challenge", error);
            // Optional: Add a toast notification here "No challenges found"
        } finally {
            setLoadingRandom(false);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            {/* === CARD 1: DAILY CHALLENGE (Click to Load) === */}
            <div
                onClick={handleDailyClick}
                className={`group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10 relative overflow-hidden h-[160px] flex flex-col justify-between cursor-pointer ${loadingDaily ? "opacity-70 pointer-events-none" : ""}`}
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-all"></div>

                <div className="flex justify-between items-start">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                        {loadingDaily ? <Loader2 className="w-5 h-5 animate-spin" /> : <Flame className="w-5 h-5" />}
                    </div>
                    <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                        +10 XP
                    </span>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-1">Daily Challenge</h3>
                    <p className="text-slate-400 text-xs">
                        {loadingDaily ? "Selecting problem..." : "Keep your streak alive!"}
                    </p>
                </div>

                <div className="flex items-center text-xs font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
                    Solve Now <ArrowRight className="w-3 h-3 ml-1" />
                </div>
            </div>


            {/* === CARD 2: CONTINUE LEARNING (Static) === */}
            <Link to="/learn" className="group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden h-[160px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all"></div>
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <BookOpen className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-1">SQL 50</h3>
                    <p className="text-slate-400 text-xs mb-2">12/50 Problems Solved</p>
                    <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[24%]"></div>
                    </div>
                </div>
            </Link>


            {/* === CARD 3: UPCOMING CONTEST (Static) === */}
            <Link to="/contests" className="group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 relative overflow-hidden h-[160px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all"></div>
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                        2d 4h
                    </span>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-1">Weekly Contest</h3>
                    <p className="text-slate-400 text-xs">Sunday, 10:00 AM</p>
                </div>
            </Link>


            {/* CARD 4: FEELING LUCKY (Active & Working) */}
            <button
                onClick={handleRandomPick}
                disabled={loadingRandom}
                className="text-left w-full group bg-[#1a1a1a] rounded-xl p-5 border border-[#2a2a2a] hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 relative overflow-hidden h-[160px] flex flex-col justify-between disabled:opacity-50 disabled:cursor-wait"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-all"></div>
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                        {loadingRandom ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Shuffle className="w-5 h-5" />
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-1">Feeling Lucky?</h3>
                    <p className="text-slate-400 text-xs">
                        {loadingRandom ? "Rolling the dice..." : "Pick a random problem"}
                    </p>
                </div>
            </button>

        </div>
    );
}