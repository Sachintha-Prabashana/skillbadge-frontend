import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft, Loader2, MessageSquare,
    Code, Link as LinkIcon, AtSign, MoreHorizontal
} from "lucide-react";
import { io } from "socket.io-client";
import { fetchComments, addComment, fetchPostById, type Comment, type Post } from "../services/discuss";
import { useToast } from "../context/ToastContext";

export default function PostDetails() {
    const { id } = useParams<{ id: string }>();
    const { showToast } = useToast();

    // State
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadData = async () => {
            try {
                const [postData, commentsData] = await Promise.all([
                    fetchPostById(id),
                    fetchComments(id)
                ]);
                setPost(postData);
                setComments(commentsData.comments);
            } catch (error) {
                showToast("Failed to load discussion", "error");
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const socket = io(import.meta.env.VITE_API_URL);
        socket.emit("join_post", id);
        socket.on("receive_comment", (c) => setComments(prev => [c, ...prev]));
        return () => { socket.disconnect() };
    }, [id, showToast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !id) return;

        setSubmitting(true);
        try {
            await addComment(id, newComment, replyingTo?._id);
            setNewComment("");
            setReplyingTo(null);
            showToast("Comment posted", "success");
        } catch (error) {
            showToast("Failed to post", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-500"/></div>;
    if (!post) return <div className="text-center py-20 text-slate-500">Post not found</div>;

    const rootComments = comments.filter(c => !c.parentId);
    const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Header / Nav */}
            <Link to="/discuss" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Discussions
            </Link>

            {/* --- POST CONTENT (Borderless) --- */}
            <div className="mb-12">
                <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>

                {/* Meta Row */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm">
                        {post.author?.firstname?.[0]}
                    </div>
                    <div className="text-sm">
                        <span className="text-slate-200 font-medium block">{post.author?.firstname} {post.author?.lastname}</span>
                        <span className="text-slate-500 text-xs">
                             {new Date(post.createdAt).toLocaleDateString()} • {post.views} views
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-6">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#262626] text-slate-400 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#262626] w-full mb-10"></div>

            {/* --- COMMENT INPUT (Rich Text Style) --- */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                    <h3 className="text-white font-bold text-lg">Comments ({comments.length})</h3>
                </div>

                <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#333] focus-within:border-slate-500 transition-colors">
                    {replyingTo && (
                        <div className="bg-[#262626] px-4 py-2 text-xs text-slate-400 flex justify-between border-b border-[#333]">
                            <span>Replying to <span className="text-emerald-400">@{replyingTo.author?.firstname}</span></span>
                            <button onClick={() => setReplyingTo(null)} className="hover:text-white"><span className="text-lg">×</span></button>
                        </div>
                    )}

                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Type comment here..."
                        className="w-full bg-transparent text-slate-200 p-4 min-h-[120px] outline-none resize-none placeholder-slate-600 font-normal"
                    />

                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#262626] border-t border-[#333]">
                        <div className="flex gap-4 text-slate-500">
                            <button className="hover:text-white transition-colors"><Code className="w-4 h-4" /></button>
                            <button className="hover:text-white transition-colors"><LinkIcon className="w-4 h-4" /></button>
                            <button className="hover:text-white transition-colors"><AtSign className="w-4 h-4" /></button>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !newComment.trim()}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-1.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Posting..." : "Comment"}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- COMMENT LIST --- */}
            <div className="space-y-8">
                {rootComments.map((root) => (
                    <div key={root._id}>
                        <CommentItem comment={root} onReply={() => setReplyingTo(root)} />

                        {/* Nested Replies */}
                        {getReplies(root._id).length > 0 && (
                            <div className="ml-5 mt-4 pl-4 border-l-2 border-[#262626] space-y-6">
                                {getReplies(root._id).map(reply => (
                                    <CommentItem key={reply._id} comment={reply} onReply={() => setReplyingTo(root)} isReply />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Clean Comment Component
function CommentItem({ comment, onReply, isReply = false }: { comment: Comment, onReply: () => void, isReply?: boolean }) {
    return (
        <div className={`flex gap-4 group ${isReply ? 'text-sm' : ''}`}>
            {/* Avatar */}
            <div className={`rounded-full flex items-center justify-center shrink-0 font-bold bg-[#262626] text-slate-400 ${isReply ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'}`}>
                {comment.author?.firstname?.[0]}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-200 font-semibold text-sm">{comment.author?.firstname} {comment.author?.lastname}</span>
                    <span className="text-slate-600 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>

                <p className="text-slate-400 leading-relaxed mb-2">{comment.content}</p>

                <div className="flex items-center gap-4">
                    <button onClick={onReply} className="text-slate-600 hover:text-white text-xs font-medium transition-colors">Reply</button>
                    <button className="text-slate-600 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
}