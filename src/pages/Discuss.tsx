import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MessageSquare, Search, TrendingUp, Plus, ThumbsUp,
    Eye, MessageCircle, Briefcase, Code2, Hash, X, Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { createPost, fetchPosts, toggleVote, type Post } from "../services/discuss";

export default function Discuss() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All Topics");
    const [searchQuery, setSearchQuery] = useState("");
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
            toast.error("Failed to load posts");
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
                // Check if this post ID already exists in our list
                // If I just created it manually, it will be there, so we ignore the socket message
                const exists = prevPosts.some(p => p._id === newPost._id);
                if (exists) return prevPosts;

                // If it's a new post from someone else, add it to the top
                toast("New discussion started!", { icon: "💬" });
                return [newPost, ...prevPosts];
            });
        });

        socket.on("vote_update", ({ postId, newCount }: { postId: string, newCount: number }) => {
            setPosts(prev => prev.map(p =>
                p._id === postId ? { ...p, voteCount: newCount } : p
            ));
        });

        return () => { socket.disconnect(); };
    }, [])

    const handleVote = async (e: React.MouseEvent, postId: string) => {
        e.preventDefault(); // Prevent clicking the Link wrapper
        try {
            // Optimistic update
            setPosts(prev => prev.map(p => p._id === postId ? { ...p, voteCount: p.voteCount + 1 } : p));
            await toggleVote(postId);
        } catch (error) {
            loadPosts(); // Revert on error
        }
    };

    // Instant State Update
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 1. Send to API
            const createdPost = await createPost({
                ...newPostData,
                tags: newPostData.tags.split(",").map(t => t.trim())
            });

            // 2. Update UI Immediately (Don't wait for socket)
            setPosts(prev => [createdPost, ...prev]);

            setIsModalOpen(false);
            setNewPostData({ title: "", content: "", category: "General", tags: "" });
            toast.success("Post created!");

        } catch (error) {
            toast.error("Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                <button onClick={() => setIsModalOpen(true)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <Plus className="w-5 h-5" /> New Post
                </button>
                {/* Categories */}
                <div className="bg-[#1a1a1a] border border-[#3e3e3e] rounded-xl overflow-hidden">
                    {[
                        { name: "All Topics", icon: Hash },
                        { name: "Interview Experience", icon: Briefcase },
                        { name: "Solutions", icon: Code2 },
                        { name: "Compensation", icon: TrendingUp },
                        { name: "General", icon: MessageSquare }
                    ].map((cat) => (
                        <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`w-full text-left px-5 py-3 flex items-center gap-3 text-sm font-medium transition-colors ${activeCategory === cat.name ? "bg-emerald-500/10 text-emerald-500 border-l-2 border-emerald-500" : "text-slate-400 hover:bg-[#282828]"}`}>
                            <cat.icon className="w-4 h-4" /> {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feed */}
            <div className="lg:col-span-3">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 bg-[#1a1a1a] border border-[#3e3e3e] rounded-xl flex items-center px-4 py-3">
                        <Search className="w-5 h-5 text-slate-500 mr-3" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="bg-transparent text-white w-full outline-none" />
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? <div className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500"/></div> :
                        posts.map(post => (
                            <div key={post._id} className="bg-[#1a1a1a] border border-[#3e3e3e] p-5 rounded-xl hover:border-emerald-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <button onClick={(e) => handleVote(e, post._id)} className="flex flex-col items-center bg-[#282828] hover:bg-[#333] rounded-lg p-2 min-w-[50px] z-10">
                                        <ThumbsUp className={`w-4 h-4 mb-1 ${post.voteCount > 0 ? "text-emerald-500" : "text-slate-400"}`} />
                                        <span className="text-sm font-bold text-white">{post.voteCount}</span>
                                    </button>
                                    <Link to={`/discuss/${post._id}`} className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.content}</p>
                                        <div className="flex items-center gap-4 text-slate-500 text-xs">
                                            <span className="text-emerald-500">{post.author?.firstname}</span>
                                            <span><MessageCircle className="w-3 h-3 inline mr-1" /> {post.commentCount} comments</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1a1a1a] w-full max-w-lg rounded-2xl p-6 border border-[#3e3e3e]">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">New Discussion</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <input required value={newPostData.title} onChange={e => setNewPostData({...newPostData, title: e.target.value})} className="w-full bg-[#282828] rounded-lg px-4 py-2 text-white outline-none" placeholder="Title" />
                            <select value={newPostData.category} onChange={e => setNewPostData({...newPostData, category: e.target.value})} className="w-full bg-[#282828] rounded-lg px-4 py-2 text-white outline-none">
                                <option>General</option>
                                <option>Interview Experience</option>
                                <option>Solutions</option>
                            </select>
                            <textarea required value={newPostData.content} onChange={e => setNewPostData({...newPostData, content: e.target.value})} className="w-full bg-[#282828] rounded-lg px-4 py-2 text-white h-32 outline-none resize-none" placeholder="Content..." />
                            <input value={newPostData.tags} onChange={e => setNewPostData({...newPostData, tags: e.target.value})} className="w-full bg-[#282828] rounded-lg px-4 py-2 text-white outline-none" placeholder="Tags (comma separated)" />
                            <button disabled={isSubmitting} className="w-full bg-emerald-500 text-black font-bold py-3 rounded-xl">{isSubmitting ? "Posting..." : "Post"}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}