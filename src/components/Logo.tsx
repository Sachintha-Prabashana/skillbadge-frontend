import { Shield, Code2 } from "lucide-react"

interface LogoProps {
    className?: string;
    showText?: boolean;
    textClassName?: string;
}

export default function Logo({
        className = "w-10 h-10",
        showText = true,
        textClassName = "text-xl"
    }: LogoProps) {
    return (
        <div className="flex items-center gap-2.5 select-none">
            {/* --- THE ICON MARK --- */}
            <div className={`relative flex items-center justify-center text-amber-500 ${className}`}>
                {/* Layer 1: The Shield (Background) */}
                <Shield
                    className="w-full h-full fill-amber-500/10"
                    strokeWidth={1.5}
                />

                {/* Layer 2: The Code Symbol (Foreground) */}
                <Code2
                    className="absolute w-[50%] h-[50%]"
                    strokeWidth={2.5}
                />
            </div>
            {/* --- THE TEXT LABEL --- */}
            {showText && (
                <div className={`font-['Satoshi',_sans-serif] font-bold tracking-tight text-white ${textClassName}`}>
                    Skill<span className="text-amber-500">Badge</span>
                </div>
            )}

        </div>
    )
}