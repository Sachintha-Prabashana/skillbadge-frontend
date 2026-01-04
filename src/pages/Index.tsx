import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Terminal, Cpu, ShieldCheck, 
  Zap, Globe, CheckCircle2, ArrowRight, Code, Trophy
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3F2F0] font-['Satoshi',_sans-serif] text-slate-900 relative selection:bg-[#0E141E] selection:text-white overflow-hidden">
      
      {/* --- NOISE TEXTURE OVERLAY --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <header className="relative z-10 pt-32 pb-24 flex flex-col items-center text-center px-4 sm:px-6">
        
        {/* News Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase text-slate-600 mb-8 shadow-sm hover:border-slate-300 transition-colors cursor-pointer max-w-[90vw] truncate"
        >
          <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="truncate">v2.0: Multi-Language Sandboxes Live</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[#0E141E] mb-6"
        >
          Prove Your<br />
          Engineering Skills<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400">With Real Code</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto text-base sm:text-lg text-slate-500 font-medium mb-10 px-4"
        >
            Forget multiple choice. Solve industry-standard challenges in ephemeral sandboxes and earn verifiable proof of your expertise.
        </motion.p>

        {/* Buttons */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
            <Link to="/register" className="h-12 px-8 flex items-center justify-center bg-[#0E141E] text-white font-bold text-sm tracking-wider uppercase hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 w-full sm:w-auto rounded-lg sm:rounded-none">
                Start Coding Free
                <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a href="#features" className="h-12 px-8 flex items-center justify-center bg-white border border-slate-200 text-[#0E141E] font-bold text-sm tracking-wider uppercase hover:border-slate-400 transition-all w-full sm:w-auto rounded-lg sm:rounded-none">
                How it Works
            </a>
        </motion.div>

        {/* --- Hero Visual (Terminal) --- */}
        <div className="mt-20 relative w-full max-w-5xl mx-auto h-[400px] sm:h-[500px]">
          {/* Wireframe Backgrounds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[800px] sm:h-[800px] border border-slate-300/30 rounded-full z-0 pointer-events-none"></div>
          
          {/* Floating Icons */}
          <FloatingIcon icon={Trophy} delay={0} x="-35%" y="-25%" /> 
          <FloatingIcon icon={Code} delay={1} x="35%" y="-15%" />   
          <FloatingIcon icon={ShieldCheck} delay={2} x="-30%" y="30%" />

          {/* Terminal */}
          <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-4 sm:top-10 left-0 right-0 z-10 bg-[#0E141E] rounded-xl shadow-2xl shadow-slate-900/20 overflow-hidden text-left max-w-[95%] sm:max-w-3xl mx-auto border border-slate-800"
          >
              <div className="flex items-center gap-2 px-4 py-3 bg-[#151b26] border-b border-slate-800">
                  <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-4 text-[10px] font-mono text-slate-500">sandbox-runner — 80x24</div>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
                  <div className="mb-2">
                      <span className="text-green-400">user@skillbadge:~$</span> sb deploy --challenge "distributed-systems-v1"
                  </div>
                  <div className="text-slate-500 mb-4">
                      → Provisioning microVM... <span className="text-green-400">Done (120ms)</span><br/>
                      → Injecting dependencies... <span className="text-green-400">Done</span><br/>
                      → Running test suite...
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400">
                      ✔ All tests passed. Score: 100/100
                  </div>
              </div>
          </motion.div>
        </div>
      </header>

      {/* =========================================
          STATS (Social Proof)
      ========================================= */}
      <section className="border-y border-slate-200 bg-white py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number="10k+" label="Developers" />
            <StatItem number="500+" label="Challenges" />
            <StatItem number="120ms" label="Boot Time" />
            <StatItem number="99.9%" label="Uptime" />
        </div>
      </section>

      {/* =========================================
          FEATURES SECTION
      ========================================= */}
      <section id="features" className="py-24 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#0E141E] mb-6">
                    Not Just Another<br/>Quiz App
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-500">
                    We provide real infrastructure. You get a dedicated microVM for every challenge, allowing you to run real servers, databases, and APIs.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={Terminal}
                    title="Ephemeral Sandboxes"
                    desc="Instant, isolated environments. Mess up? Just restart. No local setup required."
                />
                <FeatureCard 
                    icon={Cpu}
                    title="Real-Time Execution"
                    desc="Code runs on high-performance bare metal. Latency so low it feels local."
                />
                <FeatureCard 
                    icon={ShieldCheck}
                    title="Verifiable Proof"
                    desc="Don't just say you know React. Prove it with a cryptographically signed badge."
                />
                <FeatureCard 
                    icon={Globe}
                    title="Global Edge"
                    desc="Deploy your solutions to 50+ regions to test latency and optimization."
                />
                <FeatureCard 
                    icon={Zap}
                    title="Instant Feedback"
                    desc="Get detailed logs and performance metrics immediately after submission."
                />
                <FeatureCard 
                    icon={CheckCircle2}
                    title="CI/CD Integration"
                    desc="Connect GitHub. We auto-grade every commit you push to your repo."
                />
            </div>
        </div>
      </section>

      {/* =========================================
          PRICING SECTION (UPDATED: LIGHT THEME)
      ========================================= */}
      {/* 1. Removed 'bg-[#0E141E]' and 'text-white' to match light theme */}
      <section id="pricing" className="py-24 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                 <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Pricing</span>
                 {/* 2. Text color changed to Dark Slate */}
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 mb-6 text-[#0E141E]">
                    Start Free.<br/>Scale Your Career.
                 </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                {/* Free Plan (Light Card) */}
                <div className="bg-white border border-slate-200 p-8 rounded-xl hover:border-slate-400 transition-colors shadow-sm">
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-[#0E141E]">Developer</h3>
                    <div className="text-4xl font-black mb-6 text-[#0E141E]">$0<span className="text-lg font-medium text-slate-500">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-slate-600 text-sm">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> Unlimited Public Challenges</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> Basic Portfolio Profile</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> Community Support</li>
                    </ul>
                    <Link to="/register" className="block w-full py-3 bg-[#F3F2F0] border border-slate-300 text-[#0E141E] text-center font-bold uppercase text-sm rounded hover:bg-slate-200 transition-colors">
                        Sign Up Free
                    </Link>
                </div>

                {/* Pro Plan (Dark Card - High Contrast) */}
                <div className="bg-[#0E141E] text-white border border-slate-800 p-8 rounded-xl relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">Most Popular</div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-white">Pro</h3>
                    <div className="text-4xl font-black mb-6">$12<span className="text-lg font-medium text-slate-500">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-slate-400 text-sm">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400"/> Private Sandboxes</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400"/> Verified Certifications</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400"/> Priority Job Board Access</li>
                    </ul>
                    <Link to="/register" className="block w-full py-3 bg-white text-[#0E141E] text-center font-bold uppercase text-sm rounded hover:bg-slate-200 transition-colors">
                        Get Pro
                    </Link>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
}

// --- SUBCOMPONENTS ---

function StatItem({ number, label }: { number: string, label: string }) {
    return (
        <div>
            <div className="text-3xl md:text-4xl font-black text-[#0E141E] mb-1">{number}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[#0E141E]" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E141E] mb-3">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function FloatingIcon({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: string, y: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{ 
                opacity: { duration: 0.5, delay },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ left: `calc(50% + ${x})`, top: `calc(50% + ${y})` }}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-xl border border-slate-100 flex items-center justify-center z-20 hidden md:flex"
        >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
        </motion.div>
    )
}