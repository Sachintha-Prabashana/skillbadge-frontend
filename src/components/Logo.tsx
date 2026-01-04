import React from "react";
import { Terminal, Code2, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn"; // Assuming you have a class merger, or use standard string interpolation

interface LogoProps {
  theme?: "light" | "dark";
  className?: string;
  textClassName?: string;
  showText?: boolean;
}

export default function Logo({ 
  theme = "light", 
  className = "", 
  textClassName = "",
  showText = true 
}: LogoProps) {
  
  // COLOR CONFIGURATION
  const colors = {
    light: {
      textMain: "text-[#0E141E]",      // Dark Slate
      textSub: "text-slate-500",       // Grey
      iconBg: "bg-[#0E141E]",          // Black Button
      iconFg: "text-white",            // White Icon
      iconSub: "text-slate-400",       // Faint Icon
      border: "border-slate-200"
    },
    dark: {
      textMain: "text-white",          // White Text
      textSub: "text-slate-400",       // Light Grey
      iconBg: "bg-white",              // White Button
      iconFg: "text-[#0E141E]",        // Black Icon
      iconSub: "text-slate-300",       // Faint Icon
      border: "border-slate-700"
    }
  };

  const current = colors[theme];

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      
      {/* --- LOGO ICON SYMBOL --- */}
      <div className={`
        relative w-10 h-10 rounded-xl flex items-center justify-center 
        shadow-lg transition-all duration-300 ease-out
        group-hover:scale-105 group-hover:shadow-xl group-hover:rotate-1
        border ${current.border} ${current.iconBg}
      `}>
        {/* Layer 1: Background Graphic (Terminal) */}
        <Terminal 
          className={`absolute w-5 h-5 top-1.5 left-1.5 opacity-40 transition-opacity group-hover:opacity-60 ${current.iconSub}`} 
          strokeWidth={1.5}
        />
        
        {/* Layer 2: Foreground Graphic (Code) */}
        <Code2 
          className={`absolute w-5 h-5 bottom-2 right-2 z-10 ${current.iconFg}`} 
          strokeWidth={2.5}
        />

        {/* Layer 3: Subtle Sparkle (Accent) */}
        <Sparkles 
          className="absolute -top-1 -right-1 w-3 h-3 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 animate-pulse" 
          fill="currentColor"
        />
      </div>

      {/* --- TEXT LOCKUP --- */}
      {showText && (
        <div className={`flex flex-col ${textClassName}`}>
          <span className={`text-lg font-black tracking-tighter leading-none uppercase transition-colors ${current.textMain}`}>
            SkillBadge
          </span>
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${current.textSub}`}>
            Dev Platform
          </span>
        </div>
      )}
    </div>
  );
}