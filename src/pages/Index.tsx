import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { 
  Code2, 
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
  Heart
} from "lucide-react"

export default function Index() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- NAVIGATION ---
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SkillBadge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#challenges" className="hover:text-indigo-600 transition-colors">Challenges</a>
            <a href="#community" className="hover:text-indigo-600 transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Join Free
            </Link>
          </div>
        </div>
      </nav> */}

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-40">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-200 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-pink-100 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">100% Free for Students & Developers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900">
            Showcase your skills with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
              Verifiable Badges
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The open-source platform where developers master new stacks, earn achievements, and build a portfolio that speaks for itself.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 hover:-translate-y-1 transition-all"
            >
              Start Hacking
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Github className="w-5 h-5" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Community Members", val: "50k+" },
              { label: "Open Challenges", val: "1,200+" },
              { label: "Badges Earned", val: "85k+" },
              { label: "Cost to Join", val: "$0" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.val}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Level Up Your Career</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Designed by developers, for developers. Completely free, forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                title: "Skill Assessment",
                desc: "Test your knowledge with adaptative quizzes and coding challenges."
              },
              {
                icon: Trophy,
                color: "text-violet-600",
                bg: "bg-violet-50",
                title: "Earn Badges",
                desc: "Complete tracks to earn digital badges you can display on your portfolio."
              },
              {
                icon: Users,
                color: "text-pink-600",
                bg: "bg-pink-50",
                title: "Community Hub",
                desc: "Connect with other learners, share solutions, and get code reviews."
              },
              {
                icon: Terminal,
                color: "text-slate-700",
                bg: "bg-white border border-slate-200",
                title: "Web IDE",
                desc: "Code directly in your browser. No complex environment setup needed."
              },
              {
                icon: Shield,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                title: "Portfolio Ready",
                desc: "Your profile serves as a verified resume for potential employers."
              },
              {
                icon: Zap,
                color: "text-amber-600",
                bg: "bg-amber-50",
                title: "Daily Streaks",
                desc: "Keep your momentum going with daily coding prompts and rewards."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-white border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BIG CTA SECTION (LIGHT THEME) --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto relative">
           
           {/* Gradient Card */}
           <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-100">
             
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gradient-to-br from-indigo-100 to-transparent rounded-full opacity-50 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-gradient-to-tr from-purple-100 to-transparent rounded-full opacity-50 blur-3xl"></div>

             <div className="relative z-10">
               <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-6">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
               </div>
               
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                 Built for the Community. <br/>
                 <span className="text-indigo-600">Free Forever.</span>
               </h2>
               
               <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
                 We believe education should be accessible to everyone. No paywalls, no hidden fees, just pure coding.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/register" 
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-600 transition-all hover:shadow-lg"
                  >
                    Create Free Account
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link 
                     to="/explore"
                     className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                  >
                     Explore Challenges
                  </Link>
               </div>
             </div>
           </div>

        </div>
      </section>

      {/* --- FOOTER ---
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-600 rounded-lg">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">SkillBadge</span>
                </div>
                <div className="flex gap-8 text-sm text-slate-600 font-medium">
                    <a href="#" className="hover:text-indigo-600">About Us</a>
                    <a href="#" className="hover:text-indigo-600">Open Source</a>
                    <a href="#" className="hover:text-indigo-600">Discord</a>
                </div>
            </div>
            <div className="text-center text-slate-400 text-sm">
                © 2025 SkillBadge. Built with ❤️ by developers.
            </div>
        </div>
      </footer> */}

    </div>
  )
}