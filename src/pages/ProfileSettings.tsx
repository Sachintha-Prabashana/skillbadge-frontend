import { useState, useEffect } from "react";
import {
    User as UserIcon, Globe, GraduationCap,
    Save, Loader2, Plus, Trash2, Github, Linkedin, Layout,
    ChevronRight
} from "lucide-react";
import {useAuth} from "../context/authContext.tsx";
import {useToast} from "../context/ToastContext.tsx";
import {updateProfileSettings} from "../services/user.ts";


export default function Settings() {
    const { user, refreshUser } = useAuth();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState("profile");
    const [isLoading, setIsLoading] = useState(false);

    // Initial State
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        title: "",
        about: "",
        country: "",
        socials: { github: "", linkedin: "", website: "" },
        education: [] as Array<{ school: string; degree: string; fieldOfStudy: string; description: string; }>
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                title: user.title || "",
                about: user.about || "",
                country: user.country || "",
                socials: {
                    github: user.socials?.github || "",
                    linkedin: user.socials?.linkedin || "",
                    website: user.socials?.website || ""
                },
                education: user.education || []
            });
        }
    }, [user]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await updateProfileSettings(formData);
            await refreshUser();
            showToast("Profile updated successfully!", "success");
        } catch (error) {
            console.error(error);
            showToast("Failed to update profile.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEducationChange = (index: number, field: string, val: string) => {
        const newEdu: any = [...formData.education];
        newEdu[index][field] = val;
        setFormData(prev => ({ ...prev, education: newEdu }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { school: "", degree: "", fieldOfStudy: "", description: "" }]
        }));
    };

    const removeEducation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    // --- PRO STYLES ---
    // Using #0a0a0a for inputs creates depth against the #1a1a1a card
    const inputClass = "w-full bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-3 text-sm text-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-slate-700 font-medium";
    const labelClass = "block text-[11px] font-bold text-slate-500 uppercase mb-2 tracking-widest";
    const cardClass = "bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl shadow-black/20";

    return (
        <div className="w-full max-w-6xl mx-auto pb-40">

            {/* Header Section */}
            <div className="mb-12 border-b border-[#2a2a2a] pb-8">
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Settings</h1>
                <p className="text-slate-400 text-lg">Manage your identity, presence, and career history.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">

                {/* --- LEFT NAVIGATION (Sticky) --- */}
                <nav className="w-full lg:w-72 shrink-0 space-y-2 lg:sticky lg:top-6">
                    {[
                        { id: "profile", label: "Public Profile", icon: UserIcon, desc: "Name & Bio" },
                        { id: "socials", label: "Social Links", icon: Globe, desc: "Network Presence" },
                        { id: "education", label: "Education", icon: GraduationCap, desc: "Academic History" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left group flex items-center justify-between px-4 py-4 rounded-xl border transition-all duration-200 ${
                                activeTab === item.id
                                    ? "bg-[#1a1a1a] border-amber-500/50 shadow-lg shadow-amber-900/10"
                                    : "bg-transparent border-transparent hover:bg-[#1a1a1a] hover:border-[#2a2a2a]"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-lg transition-colors ${
                                    activeTab === item.id ? "bg-amber-500 text-black" : "bg-[#252526] text-slate-400 group-hover:text-white"
                                }`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className={`block text-sm font-bold ${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                                        {item.label}
                                    </span>
                                    <span className="text-xs text-slate-600 font-medium">{item.desc}</span>
                                </div>
                            </div>
                            {activeTab === item.id && <ChevronRight className="w-4 h-4 text-amber-500" />}
                        </button>
                    ))}
                </nav>

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 w-full space-y-8 min-w-0">

                    {/* 1. PUBLIC PROFILE */}
                    {activeTab === "profile" && (
                        <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${cardClass}`}>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Identity</h2>
                                    <p className="text-slate-500 text-sm mt-1">How you appear to other developers.</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#252526] border border-[#333] flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className={labelClass}>First Name</label>
                                    <input
                                        value={formData.firstname}
                                        onChange={e => setFormData({...formData, firstname: e.target.value})}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Last Name</label>
                                    <input
                                        value={formData.lastname}
                                        onChange={e => setFormData({...formData, lastname: e.target.value})}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className={labelClass}>Headline</label>
                                    <input
                                        value={formData.title}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        placeholder="e.g. Full Stack Developer"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Location</label>
                                    <input
                                        value={formData.country}
                                        onChange={e => setFormData({...formData, country: e.target.value})}
                                        placeholder="e.g. Sri Lanka"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>About Me</label>
                                <textarea
                                    rows={5}
                                    value={formData.about}
                                    onChange={e => setFormData({...formData, about: e.target.value})}
                                    placeholder="Write a short bio about yourself..."
                                    className={`${inputClass} resize-none leading-relaxed`}
                                />
                                <p className="text-xs text-slate-600 mt-2 text-right">{formData.about.length}/500</p>
                            </div>
                        </div>
                    )}

                    {/* 2. SOCIAL LINKS */}
                    {activeTab === "socials" && (
                        <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${cardClass}`}>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Social Presence</h2>
                                    <p className="text-slate-500 text-sm mt-1">Connect your networks to build trust.</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#252526] border border-[#333] flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { key: "github", icon: Github, color: "text-white", bg: "bg-[#24292e]", label: "GitHub" },
                                    { key: "linkedin", icon: Linkedin, color: "text-white", bg: "bg-[#0077b5]", label: "LinkedIn" },
                                    { key: "website", icon: Layout, color: "text-white", bg: "bg-emerald-600", label: "Portfolio" },
                                ].map((social: any) => (
                                    <div key={social.key} className="group relative">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-3 pointer-events-none z-10">
                                            <div className={`w-8 h-8 rounded-md ${social.bg} flex items-center justify-center shadow-lg`}>
                                                <social.icon className={`w-4 h-4 ${social.color}`} />
                                            </div>
                                        </div>
                                        <input
                                            value={(formData.socials as any)[social.key]}
                                            onChange={e => setFormData({...formData, socials: {...formData.socials, [social.key]: e.target.value}})}
                                            placeholder={`https://${social.key === 'website' ? 'portfolio' : social.key}.com/...`}
                                            className={`${inputClass} pl-14`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3. EDUCATION */}
                    {activeTab === "education" && (
                        <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${cardClass}`}>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Education History</h2>
                                    <p className="text-slate-500 text-sm mt-1">Share your academic journey.</p>
                                </div>
                                <button
                                    onClick={addEducation}
                                    className="group flex items-center gap-2 px-4 py-2 bg-[#252526] hover:bg-[#2a2a2a] border border-[#333] hover:border-amber-500/50 rounded-full transition-all"
                                >
                                    <div className="w-5 h-5 rounded-full bg-amber-500/10 group-hover:bg-amber-500 text-amber-500 group-hover:text-black flex items-center justify-center transition-colors">
                                        <Plus className="w-3 h-3" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-wide">Add</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {formData.education.map((edu, index) => (
                                    <div key={index} className="group relative p-6 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl hover:border-slate-600 transition-colors duration-300">
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeEducation(index)}
                                            className="absolute -top-3 -right-3 w-8 h-8 bg-[#1e1e1e] border border-[#333] text-slate-500 hover:text-red-500 hover:border-red-500/50 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                            <div>
                                                <label className={labelClass}>School / University</label>
                                                <input
                                                    value={edu.school}
                                                    onChange={e => handleEducationChange(index, 'school', e.target.value)}
                                                    placeholder="University Name"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Degree</label>
                                                <input
                                                    value={edu.degree}
                                                    onChange={e => handleEducationChange(index, 'degree', e.target.value)}
                                                    placeholder="BSc, MSc, etc."
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label className={labelClass}>Field of Study</label>
                                            <input
                                                value={edu.fieldOfStudy}
                                                onChange={e => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                                                placeholder="e.g. Computer Science"
                                                className={inputClass}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Description / Activities</label>
                                            <textarea
                                                rows={2}
                                                value={edu.description || ""}
                                                onChange={e => handleEducationChange(index, 'description', e.target.value)}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Dean's List, Coding Club, etc."
                                            />
                                        </div>
                                    </div>
                                ))}

                                {formData.education.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#2a2a2a] rounded-2xl bg-[#121212]/50">
                                        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4 shadow-inner">
                                            <GraduationCap className="w-8 h-8 text-slate-600" />
                                        </div>
                                        <h3 className="text-white font-bold mb-1">No Education Added</h3>
                                        <p className="text-slate-500 text-sm max-w-xs text-center mb-6">Add your university or school details to complete your profile.</p>
                                        <button onClick={addEducation} className="text-sm font-bold text-amber-500 hover:text-amber-400 hover:underline">
                                            Add First School
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* FLOATING SAVE BAR */}
                    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
                        <div className="bg-[#1a1a1a] border border-[#333] p-2 pl-6 pr-2 rounded-full shadow-2xl shadow-black/50 flex items-center gap-6 pointer-events-auto transform translate-y-0 opacity-100 transition-all">
                            <span className="text-slate-400 text-xs font-medium hidden sm:inline">
                                {isLoading ? "Syncing to cloud..." : "Unsaved changes"}
                            </span>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-white hover:bg-slate-200 text-black rounded-full text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Changes
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}