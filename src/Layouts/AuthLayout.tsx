import { Outlet, Link } from "react-router-dom";
import { CheckCircle2, Cpu, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../components/Logo"; // Make sure path matches where you saved Logo.tsx

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex font-['Satoshi',_sans-serif]">
      
      {/* =========================================================
          LEFT SIDE: DEVELOPER BRANDING (Industrial Dark Theme)
      ========================================================= */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[55%] bg-[#0E141E] relative overflow-hidden flex-col justify-between p-12 text-white selection:bg-indigo-500 selection:text-white">
        
        {/* --- Background Effects (Noise & Grid) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* --- Top: Brand (Using Logo Component - Dark Mode) --- */}
        <div className="relative z-10">
          <Link to="/">
            <Logo theme="dark" />
          </Link>
        </div>

        {/* --- Middle: The "Hero" Content --- */}
        <div className="relative z-10 max-w-lg mt-12">
           <h1 className="text-4xl xl:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
             Validate Your <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Engineering Mastery</span>
           </h1>
           <p className="text-slate-400 text-lg mb-10 font-medium max-w-md">
             Join 10,000+ developers solving real-world challenges on ephemeral infrastructure.
           </p>

           {/* --- The "Terminal" Visual (Animated) --- */}
           <div className="bg-[#151b26] rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm relative group">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1e2532] border-b border-slate-800">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                 </div>
                 <div className="ml-3 text-[10px] text-slate-500">auth-service — bash</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-5 space-y-3">
                 <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-green-400">➜</span>
                    <span>git commit -m "feat: implement jwt auth"</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-green-400">➜</span>
                    <span>skillbadge verify ./auth.ts</span>
                 </div>
                 
                 <div className="pt-2 pb-1">
                    <div className="text-slate-500 mb-1 text-xs">Running test suite...</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          className="h-full bg-indigo-500"
                       />
                    </div>
                 </div>

                 <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold">PASS: Authentication verified (42ms)</span>
                 </div>
              </div>
           </div>
        </div>

        {/* --- Bottom: Social Proof / Footer --- */}
        <div className="relative z-10 mt-auto pt-12">
           <div className="flex items-center gap-8 border-t border-white/10 pt-6">
              <div className="flex flex-col">
                 <span className="text-2xl font-black">1.2M+</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Code Submissions</span>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 <Cpu className="w-6 h-6" />
                 <Globe className="w-6 h-6" />
                 <span className="text-xs font-bold uppercase tracking-wider">Powered by SPSolutions</span>
              </div>
           </div>
        </div>
      </div>

      {/* =========================================================
          RIGHT SIDE: FORM AREA (Clean White)
      ========================================================= */}
      <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center items-center bg-white relative">
        
        {/* Mobile Logo (Visible only on small screens) - Light Mode */}
        <div className="lg:hidden absolute top-8 left-8">
           <Link to="/">
              <Logo theme="light" />
           </Link>
        </div>

        {/* The Login/Register Forms Render Here */}
        <div className="w-full max-w-[440px] px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
        </div>

      </div>

    </div>
  );
}