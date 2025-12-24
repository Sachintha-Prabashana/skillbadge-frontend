import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MessageSquare, Search, TrendingUp, Plus, ArrowUpCircle,
    MessageCircle, Briefcase, Code2, Hash, X, Loader2
} from "lucide-react";
import { io } from "socket.io-client";
import { createPost, fetchPosts, toggleVote, type Post } from "../services/discuss";
import { useToast } from "../context/ToastContext";

export default function Discuss() {
    const { showToast } = useToast();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All Topics");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPostData, setNewPostData] = useState({ title: "", content: "", category: "General", tags: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial Load
    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await fetchPosts({
                category: activeCategory,
                search: searchQuery
            });
            setPosts(data);
        } catch (error) {
            console.error(error);
            showToast("Failed to load posts", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(loadPosts, 500);
        return () => clearTimeout(timer);
    }, [activeCategory, searchQuery]);

    // WebSocket Connection
    useEffect(() => {
        const socket = io("http://localhost:5000");

        socket.on("new_post", (newPost: Post) => {
            setPosts((prevPosts) => {
                const exists = prevPosts.some(p => p._id === newPost._id);
                if (exists) return prevPosts;
                showToast("New discussion started!", "info");
                return [newPost, ...prevPosts];
            });
        });

        socket.on("vote_update", ({ postId, newCount }: { postId: string, newCount: number }) => {
            setPosts(prev => prev.map(p =>
                p._id === postId ? { ...p, voteCount: newCount } : p
            ));
        });

        return () => { socket.disconnect(); };
    }, [showToast]);

    const handleVote = async (e: React.MouseEvent, postId: string) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setPosts(prev => prev.map(p => p._id === postId ? { ...p, voteCount: p.voteCount + 1 } : p));
            await toggleVote(postId);
        } catch (error) {
            loadPosts();
            showToast("Failed to vote", "error");
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const createdPost = await createPost({
                ...newPostData,
                tags: newPostData.tags.split(",").map(t => t.trim())
            });
            setPosts(prev => [createdPost, ...prev]);
            setIsModalOpen(false);
            setNewPostData({ title: "", content: "", category: "General", tags: "" });
            showToast("Post created successfully!", "success");
        } catch (error) {
            showToast("Failed to create post", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* --- LEFT SIDEBAR (Navigation) --- */}
            <div className="lg:col-span-3 space-y-2">
                {/* ⚪️ NEW POST BUTTON (Neutral White/Grey) */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white hover:bg-slate-200 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all mb-6"
                >
                    <Plus className="w-5 h-5" /> New Post
                </button>

                {/* Categories List */}
                <div className="space-y-1">
                    {[
                        { name: "All Topics", icon: Hash },
                        { name: "Interview Experience", icon: Briefcase },
                        { name: "Solutions", icon: Code2 },
                        { name: "Compensation", icon: TrendingUp },
                        { name: "General", icon: MessageSquare }
                    ].map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium rounded-lg transition-colors ${
                                activeCategory === cat.name
                                    ? "text-white bg-[#262626]" // Active: White text, subtle dark bg
                                    : "text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a]"
                            }`}
                        >
                            <cat.icon className={`w-4 h-4 ${activeCategory === cat.name ? "text-white" : "text-slate-500"}`} />
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- MAIN FEED (Right) --- */}
            <div className="lg:col-span-9">

                {/* Search Bar */}
                <div className="bg-[#1a1a1a] rounded-xl px-4 py-3 flex items-center mb-6 border border-[#262626] focus-within:border-slate-500 transition-colors">
                    <Search className="w-5 h-5 text-slate-500 mr-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search topics, companies, or keywords..."
                        className="bg-transparent text-white w-full outline-none placeholder-slate-600"
                    />
                </div>

                {/* Posts List */}
                <div className="space-y-2">
                    {loading ? (
                        <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-500"/></div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-[#161616] rounded-xl border border-[#262626] border-dashed">
                            No discussions found. Be the first to post!
                        </div>
                    ) : (
                        posts.map(post => (
                            <div key={post._id} className="group bg-[#161616] hover:bg-[#1c1c1c] p-5 rounded-lg transition-colors border border-transparent hover:border-[#262626]">
                                <div className="flex gap-4">

                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-slate-500 font-bold text-sm shrink-0 border border-[#333]">
                                        {post.author?.firstname?.[0] || "?"}
                                    </div>

                                    <div className="flex-1">
                                        <Link to={`/discuss/${post._id}`} className="block">
                                            {/* 🔵 Title Hover -> Blue (Standard) or White */}
                                            <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors mb-1">
                                                {post.title}
                                            </h3>

                                            <p className="text-slate-500 text-sm line-clamp-2 mb-3 leading-relaxed">
                                                {post.content}
                                            </p>
                                        </Link>

                                        {/* Meta Data Row */}
                                        <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
                                            <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                                                {post.author?.firstname} {post.author?.lastname}
                                            </span>

                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>

                                            <span className="flex items-center gap-1.5 hover:text-slate-300">
                                                <MessageCircle className="w-3.5 h-3.5" /> {post.commentCount}
                                            </span>

                                            {/* 🔵 Vote Button -> Blue or White */}
                                            <button
                                                onClick={(e) => handleVote(e, post._id)}
                                                className={`flex items-center gap-1.5 transition-colors ${post.voteCount > 0 ? "text-blue-400" : "hover:text-blue-400"}`}
                                            >
                                                <ArrowUpCircle className="w-3.5 h-3.5" />
                                                {post.voteCount} votes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- CREATE POST MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1a1a1a] w-full max-w-lg rounded-2xl p-6 border border-[#333] shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">New Discussion</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Title</label>
                                <input
                                    required
                                    value={newPostData.title}
                                    onChange={e => setNewPostData({...newPostData, title: e.target.value})}
                                    className="w-full bg-[#262626] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-slate-500 transition-colors"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
                                <select
                                    value={newPostData.category}
                                    onChange={e => setNewPostData({...newPostData, category: e.target.value})}
                                    className="w-full bg-[#262626] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-slate-500 transition-colors appearance-none"
                                >
                                    <option>General</option>
                                    <option>Interview Experience</option>
                                    <option>Solutions</option>
                                    <option>Compensation</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Content</label>
                                <textarea
                                    required
                                    value={newPostData.content}
                                    onChange={e => setNewPostData({...newPostData, content: e.target.value})}
                                    className="w-full bg-[#262626] border border-[#333] rounded-lg px-4 py-3 text-white h-32 outline-none resize-none focus:border-slate-500 transition-colors leading-relaxed"
                                    placeholder="Share your thoughts..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Tags</label>
                                <input
                                    value={newPostData.tags}
                                    onChange={e => setNewPostData({...newPostData, tags: e.target.value})}
                                    className="w-full bg-[#262626] border border-[#333] rounded-lg px-4 py-2.5 text-white outline-none focus:border-slate-500 transition-colors"
                                    placeholder="e.g. Java, System Design (comma separated)"
                                />
                            </div>

                            {/* ⚪️ MODAL BUTTON - Neutral Style */}
                            <button
                                disabled={isSubmitting}
                                className="w-full bg-white hover:bg-slate-200 text-black font-bold py-3 rounded-lg mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Publishing..." : "Post Discussion"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}