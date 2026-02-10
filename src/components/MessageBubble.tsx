import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
    role: "assistant" | "user";
    content: string;
}

export default function MessageBubble({ role, content }: MessageProps) {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? 'justify-end' : 'justify-start'}`}>

            {/* AI Avatar (Orange Theme) */}
            {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 mt-0.5 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                    <Bot className="w-4 h-4 text-orange-500" />
                </div>
            )}

            {/* Message Content Bubble */}
            <div className={`relative px-5 py-3.5 text-sm leading-relaxed shadow-sm max-w-[80%] md:max-w-[70%] ${
                isUser
                    ? 'bg-orange-600 text-white rounded-2xl rounded-tr-sm shadow-md shadow-orange-900/20'
                    : 'bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-300 rounded-2xl rounded-tl-sm'
            }`}>
                <ReactMarkdown
                    components={{
                        // Code blocks styling
                        code: ({node, className, children, ...props}: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !match ? (
                                // Inline Code
                                <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs border border-white/5" {...props}>
                                    {children}
                                </code>
                            ) : (
                                // Block Code (e.g., ```js ... ```)
                                <code className="block bg-[#0a0a0a] p-3 rounded-lg text-amber-100 font-mono text-xs border border-[#333] my-2 overflow-x-auto" {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-[#2a2a2a] mt-0.5">
                    <User className="w-4 h-4 text-zinc-500" />
                </div>
            )}
        </div>
    );
}