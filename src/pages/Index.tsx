import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Trophy,
    Zap,
    Users,
    ArrowRight,
    Sparkles,
    Brain,
    Shield,
    ChevronRight,
    Terminal,
    Github,
    Heart,
    Code2
} from "lucide-react";

export default function LandingPage() {
    return (
        // MAIN BACKGROUND: Matches your Sidebar/Navbar theme
        <div className="min-h-screen bg-[#0e141e] text-white font-['Satoshi',_sans-serif] selection:bg-indigo-500/30 selection:text-indigo-200">

            {/* --- HERO SECTION --- */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">

                {/* Dark Mode Background Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8 hover:border-indigo-500/50 transition-colors cursor-default">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium text-indigo-200">100% Free for Students & Developers</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white">
                        Showcase your skills with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
              Verifiable Badges
            </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The open-source platform where developers master new stacks, earn achievements, and build a portfolio that speaks for itself.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40 hover:shadow-indigo-600/40 hover:-translate-y-1"
                        >
                            Start Hacking
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0e141e] text-slate-300 border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* --- STATS BAR --- */}
            <section className="border-y border-slate-800 bg-[#0b1018]/50 backdrop-blur-sm py-12 relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Community Members", val: "50k+" },
                            { label: "Open Challenges", val: "1,200+" },
                            { label: "Badges Earned", val: "85k+" },
                            { label: "Cost to Join", val: "$0" }
                        ].map((stat, idx) => (
                            <div key={idx} className="group cursor-default">
                                <div className="text-3xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{stat.val}</div>
                                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide group-hover:text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section id="features" className="py-24 bg-[#0e141e]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Level Up Your Career</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Designed by developers, for developers. Completely free, forever.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Brain,
                                color: "text-indigo-400",
                                bg: "bg-indigo-900/20",
                                title: "Skill Assessment",
                                desc: "Test your knowledge with adaptative quizzes and coding challenges."
                            },
                            {
                                icon: Trophy,
                                color: "text-purple-400",
                                bg: "bg-purple-900/20",
                                title: "Earn Badges",
                                desc: "Complete tracks to earn digital badges you can display on your portfolio."
                            },
                            {
                                icon: Users,
                                color: "text-pink-400",
                                bg: "bg-pink-900/20",
                                title: "Community Hub",
                                desc: "Connect with other learners, share solutions, and get code reviews."
                            },
                            {
                                icon: Terminal,
                                color: "text-emerald-400",
                                bg: "bg-emerald-900/20",
                                title: "Web IDE",
                                desc: "Code directly in your browser. No complex environment setup needed."
                            },
                            {
                                icon: Shield,
                                color: "text-sky-400",
                                bg: "bg-sky-900/20",
                                title: "Portfolio Ready",
                                desc: "Your profile serves as a verified resume for potential employers."
                            },
                            {
                                icon: Zap,
                                color: "text-amber-400",
                                bg: "bg-amber-900/20",
                                title: "Daily Streaks",
                                desc: "Keep your momentum going with daily coding prompts and rewards."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300">
                                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BIG CTA SECTION (DARK GLOW THEME) --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative">

                    {/* Dark Gradient Card */}
                    <div className="relative bg-[#0b1018] border border-slate-800 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px]"></div>

                        <div className="relative z-10">
                            <div className="inline-flex p-3 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-sm mb-6 backdrop-blur-sm">
                                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Built for the Community. <br/>
                                <span className="text-indigo-400">Free Forever.</span>
                            </h2>

                            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                                We believe education should be accessible to everyone. No paywalls, no hidden fees, just pure coding.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/30"
                                >
                                    Create Free Account
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/challenges"
                                    className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-600 text-slate-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all"
                                >
                                    Explore Challenges
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}