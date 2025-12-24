import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send, Loader2, Reply, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { fetchComments, addComment, type Comment } from "../services/discuss";

export default function PostDetails() {
    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // 👇 NEW STATE: Who are we replying to?
    const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

    // ... useEffect for loading/socket remains the same ...
    useEffect(() => {
        if (!id) return;
        fetchComments(id).then(data => setComments(data.comments)).finally(() => setLoading(false));

        const socket = io("http://localhost:5000");
        socket.emit("join_post", id);
        socket.on("receive_comment", (c) => setComments(prev => [c, ...prev]));
        return () => { socket.disconnect() };
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !id) return;

        setSubmitting(true);
        try {
            // 👇 Send parentId if we are replying
            await addComment(id, newComment, replyingTo?._id);
            setNewComment("");
            setReplyingTo(null); // Close the reply banner
            toast.success("Response sent!");
        } catch (error) {
            toast.error("Failed");
        } finally {
            setSubmitting(false);
        }
    };

    // 👇 Helper: Organize comments into Parent -> Children tree
    const rootComments = comments.filter(c => !c.parentId);
    const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link to="/discuss" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 w-fit">
                <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <div className="bg-[#1a1a1a] border border-[#3e3e3e] rounded-xl p-6 min-h-[400px] flex flex-col relative">

                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-500" />
                    Comments ({comments.length})
                </h3>

                {/* --- INPUT AREA --- */}
                <div className="mb-8 sticky top-4 z-10">
                    {/* 👇 "Replying to..." Banner (TikTok Style) */}
                    {replyingTo && (
                        <div className="bg-[#282828] text-slate-400 text-xs px-4 py-2 rounded-t-xl flex justify-between items-center border-x border-t border-[#3e3e3e]">
                            <span>
                                Replying to <span className="text-emerald-500 font-bold">@{replyingTo.author?.firstname}</span>
                            </span>
                            <button onClick={() => setReplyingTo(null)}>
                                <X className="w-4 h-4 hover:text-white" />
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={replyingTo ? `Reply to ${replyingTo.author?.firstname}...` : "Add to the discussion..."}
                            className={`flex-1 bg-[#282828] border border-[#3e3e3e] p-4 text-white outline-none resize-none h-24 focus:border-emerald-500 transition-all ${replyingTo ? 'rounded-b-xl border-t-0' : 'rounded-xl'}`}
                        />
                        <button disabled={submitting || !newComment.trim()} className="bg-emerald-500 text-black font-bold px-6 rounded-xl hover:bg-emerald-400 h-24">
                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </form>
                </div>

                {/* --- COMMENTS LIST (NESTED) --- */}
                <div className="space-y-6">
                    {rootComments.map((root) => (
                        <div key={root._id}>
                            {/* Main Comment */}
                            <CommentItem
                                comment={root}
                                onReply={() => setReplyingTo(root)}
                            />

                            {/* Replies (Indented) */}
                            <div className="ml-12 mt-3 space-y-3 border-l-2 border-[#282828] pl-4">
                                {getReplies(root._id).map((reply) => (
                                    <CommentItem
                                        key={reply._id}
                                        comment={reply}
                                        onReply={() => setReplyingTo(root)} // Keeping nesting 1-level deep usually better for UI
                                        isReply
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// 👇 Extracted Component for cleaner code
function CommentItem({ comment, onReply, isReply = false }: { comment: Comment, onReply: () => void, isReply?: boolean }) {
    return (
        <div className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 ${isReply ? 'opacity-90' : ''}`}>
            {/* Avatar */}
            <div className={`rounded-full flex items-center justify-center border border-[#3e3e3e] text-emerald-500 font-bold shrink-0 bg-[#282828] ${isReply ? 'w-8 h-8 text-xs' : 'w-10 h-10'}`}>
                {comment.author?.firstname?.[0]}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm">{comment.author?.firstname}</span>
                    <span className="text-slate-600 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>

                <p className="text-slate-300 text-sm whitespace-pre-wrap mb-1">{comment.content}</p>

                {/* Reply Button */}
                <button
                    onClick={onReply}
                    className="text-slate-500 text-xs font-medium hover:text-emerald-500 flex items-center gap-1 transition-colors"
                >
                    <Reply className="w-3 h-3" /> Reply
                </button>
            </div>
        </div>
    )
}