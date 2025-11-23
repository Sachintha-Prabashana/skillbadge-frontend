import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Code2, Terminal } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex font-['Satoshi',_'Open_Sans',_sans-serif] text-[#0e141e]">
      
      {/* --- LEFT SIDE: VISUALS (HackerRank Style) --- */}
      {/* Dark background, code snippets, marketing copy */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#0e141e] relative overflow-hidden flex-col justify-between p-16 text-white">
        
        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded text-white">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">SkillBadge</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 my-auto max-w-lg">
           <h1 className="text-4xl font-bold mb-6 leading-[1.2]">
             Practice coding, prepare for interviews, and get hired.
           </h1>
           
           {/* The "Code Card" Aesthetic */}
           <div className="mt-8 bg-[#1c2430] rounded-lg border border-[#2c3645] p-6 font-mono text-sm shadow-2xl">
             <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
             </div>
             <div className="space-y-1 text-gray-300">
                <p><span className="text-indigo-400">const</span> <span className="text-yellow-200">isHired</span> = (<span className="text-orange-300">skills</span>) ={">"} {"{"}</p>
                <p className="pl-4"><span className="text-indigo-400">if</span> (skills.<span className="text-blue-300">includes</span>(<span className="text-green-400">'SkillBadge'</span>)) {"{"}</p>
                <p className="pl-8"><span className="text-indigo-400">return</span> <span className="text-indigo-400">true</span>;</p>
                <p className="pl-4">{"}"}</p>
                <p>{"}"};</p>
             </div>
           </div>
        </div>

        {/* Bottom Links */}
        <div className="relative z-10 flex gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM AREA --- */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center bg-white p-6 sm:p-12 relative overflow-y-auto">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
           <Link to="/" className="flex items-center gap-2">
             <Code2 className="w-6 h-6 text-indigo-600" />
             <span className="text-xl font-bold text-[#0e141e]">SkillBadge</span>
           </Link>
        </div>

        {/* Render Login/Register Here */}
        <Outlet /> 
      </div>

    </div>
  );
}