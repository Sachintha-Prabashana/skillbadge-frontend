import { type LucideIcon } from "lucide-react"

interface StatRowProps {
    label: string
    value: string | number
    icon: LucideIcon
    color: string
}

export default function StatRow({ label, value, icon: Icon, color }: StatRowProps ) {
    return (
        <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl border border-[#333] hover:border-[#444] transition-colors group">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-[#282828] ${color} bg-opacity-10`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <span className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
            {label}
        </span>
            </div>
            <span className="text-white font-bold font-mono text-lg">{value}</span>
        </div>
    );
}