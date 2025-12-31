import { GraduationCap } from "lucide-react";

interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export default function EducationSection({ education }: { education?: Education[] }) {
    if (!education || education.length === 0) return null;

    return (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                Education
            </h3>

            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-[#2a2a2a] last:border-transparent">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#121212] border-2 border-indigo-500"></div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                            <h4 className="text-base font-bold text-slate-200">{edu.school}</h4>
                            <span className="text-xs font-mono text-slate-500 bg-[#252526] px-2 py-1 rounded">
                                {edu.startDate || "N/A"} - {edu.endDate || "Present"}
                            </span>
                        </div>

                        <p className="text-sm text-indigo-400 font-medium mb-1">
                            {edu.degree} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ""}
                        </p>

                        {edu.description && (
                            <p className="text-sm text-slate-400 leading-relaxed mt-2">
                                {edu.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}