import { type LucideIcon } from "lucide-react"

interface SocialButtonProps {
    icon: LucideIcon
    href?: string
}

export default function SocialButton({ icon: Icon, href } : SocialButtonProps) {
    return (
        <a
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#1a1a1a] rounded-lg border border-[#3e3e3e] text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center"
        >
            <Icon className="w-4 h-4" />
        </a>
    )
}