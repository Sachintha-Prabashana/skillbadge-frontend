import React, { useState } from "react";
import {
    Save,
    Trash2,
    Code2,
    CheckCircle,
    AlertCircle,
    Lightbulb,
    Sparkles,
    Loader2,
    Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // <--- Import this
import api from "../../services/api";

const SUPPORTED_LANGUAGES = [
    { id: "javascript", label: "JavaScript (Node.js)" },
    { id: "python", label: "Python 3" },
    { id: "java", label: "Java" },
    { id: "cpp", label: "C++" }
];

export default function CreateChallenge() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeLangTab, setActiveLangTab] = useState<string>("");

    // --- AI STATES ---
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty: "EASY",
        points: 10,
        tips: [""],
        allowedLanguages: [] as string[],
        starterCode: [] as { language: string; code: string }[],
        testCases: [{ input: "", output: "", isHidden: false }]
    });

    // --- HANDLERS ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleLanguage = (langId: string) => {
        const isSelected = formData.allowedLanguages.includes(langId);
        let newAllowed = [...formData.allowedLanguages];
        let newStarterCode = [...formData.starterCode];

        if (isSelected) {
            newAllowed = newAllowed.filter(l => l !== langId);
            newStarterCode = newStarterCode.filter(sc => sc.language !== langId);
            if (activeLangTab === langId) setActiveLangTab(newAllowed[0] || "");
        } else {
            newAllowed.push(langId);
            newStarterCode.push({ language: langId, code: "" });
            setActiveLangTab(langId);
        }
        setFormData({ ...formData, allowedLanguages: newAllowed, starterCode: newStarterCode });
    }

    const handleCodeChange = (code: string) => {
        const updatedStarter = formData.starterCode.map(sc =>
            sc.language === activeLangTab ? { ...sc, code } : sc
        )
        setFormData({ ...formData, starterCode: updatedStarter });
    }

    const addTestCase = () => {
        setFormData({ ...formData, testCases: [...formData.testCases, { input: "", output: "", isHidden: true }] });
    }

    const updateTestCase = (index: number, field: string, value: any) => {
        const newCases: any = [...formData.testCases];
        newCases[index][field] = value;
        setFormData({ ...formData, testCases: newCases });
    };

    const removeTestCase = (index: number) => {
        setFormData({ ...formData, testCases: formData.testCases.filter((_, i) => i !== index) });
    };

    const handleTipChange = (index: number, value: string) => {
        const newTips = [...formData.tips];
        newTips[index] = value;
        setFormData({ ...formData, tips: newTips });
    };

    const addTip = () => setFormData({ ...formData, tips: [...formData.tips, ""] });
    const removeTip = (index: number) => {
        setFormData({ ...formData, tips: formData.tips.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/challenges/create", formData);
            toast.success("Challenge published successfully!", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#10B981",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                }
            });

            // Small delay so they see the success message before moving
            setTimeout(() => {
                navigate("/admin/challenge");
            }, 1000);
        } catch (error) {
            toast.error("Failed to publish challenge. Please try again.", {
                position: 'top-right'
            });
        } finally {
            setLoading(false);
        }
    };

    // --- AI HANDLER ---
    const handleAIGenerate = async () => {
        if (!aiPrompt) return;
        setIsGenerating(true);
        try {
            const res = await api.post("/challenges/generate-ai", { topic: aiPrompt });
            setFormData(res.data);
            if (res.data.allowedLanguages?.length > 0) {
                setActiveLangTab(res.data.allowedLanguages[0]);
            }
        } catch (error) {
            alert("AI Generation failed. Try a different prompt.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-['Satoshi',_sans-serif] pb-12">
            {/* Put this at the very top of your returned div */}
            <Toaster />

            {/* --- HEADER --- */}
            <div className="flex justify-between items-center pt-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Create Challenge</h1>
                    <p className="text-slate-500 mt-1">Design a new coding problem manually or with AI.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-70"
                >
                    {loading ? "Saving..." : <><Save className="w-5 h-5" /> Publish Challenge</>}
                </button>
            </div>

            {/* --- AI MAGIC SECTION (NEW) --- */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                            <Sparkles className="w-5 h-5 text-indigo-600 fill-indigo-600 animate-pulse" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Generate with AI</h3>
                    </div>

                    <div className="flex gap-3">
                        <input
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g., 'A hard dynamic programming problem about finding the longest palindrome substring'"
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                            onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
                        />
                        <button
                            onClick={handleAIGenerate}
                            disabled={isGenerating || !aiPrompt}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
                        >
                            {isGenerating ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                            ) : (
                                <><Sparkles className="w-4 h-4 text-yellow-300" /> Magic Generate</>
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 ml-1 font-medium">
                        Tip: Specify difficulty and language preference for better results.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Basic Info Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-indigo-600" />
                            </div>
                            Challenge Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400"
                                    placeholder="e.g. Reverse Linked List"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description (Markdown)</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 font-mono text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400"
                                    placeholder="## Problem Statement..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Difficulty</label>
                                    <select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                                    >
                                        <option value="EASY">Easy</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HARD">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Points</label>
                                    <input
                                        type="number"
                                        name="points"
                                        value={formData.points}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Language Config */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Code2 className="w-5 h-5 text-indigo-600" />
                            </div>
                            Language Configuration
                        </h2>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-700 mb-3">Allowed Languages</label>
                            <div className="flex flex-wrap gap-3">
                                {SUPPORTED_LANGUAGES.map(lang => (
                                    <button
                                        key={lang.id}
                                        type="button"
                                        onClick={() => toggleLanguage(lang.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                                            formData.allowedLanguages.includes(lang.id)
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {formData.allowedLanguages.length > 0 ? (
                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                                <div className="flex border-b border-slate-200 bg-white">
                                    {formData.allowedLanguages.map(langId => (
                                        <button
                                            key={langId}
                                            type="button"
                                            onClick={() => setActiveLangTab(langId)}
                                            className={`px-5 py-3 text-sm font-mono border-r border-slate-200 transition-colors ${
                                                activeLangTab === langId
                                                    ? "bg-slate-50 text-indigo-600 font-bold border-b-2 border-b-indigo-600"
                                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                            }`}
                                        >
                                            {langId}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-0">
                                    <textarea
                                        value={formData.starterCode.find(sc => sc.language === activeLangTab)?.code || ""}
                                        onChange={(e) => handleCodeChange(e.target.value)}
                                        className="w-full h-64 bg-[#1e293b] text-blue-100 font-mono text-sm p-4 focus:outline-none resize-none"
                                        placeholder={`// Write starter code for ${activeLangTab} here...`}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 text-sm">
                                Select at least one language to configure starter code.
                            </div>
                        )}
                    </div>

                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="space-y-8">

                    {/* 3. Test Cases */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-600" /> Test Cases
                            </h2>
                            <button
                                type="button"
                                onClick={addTestCase}
                                className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 border border-indigo-200"
                            >
                                + Add
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.testCases.map((tc, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    <button
                                        type="button"
                                        onClick={() => removeTestCase(idx)}
                                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Input (stdin)</label>
                                            <textarea
                                                value={tc.input}
                                                onChange={(e) => updateTestCase(idx, "input", e.target.value)}
                                                className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900 font-mono h-14 mt-1 focus:border-indigo-500 focus:outline-none placeholder:text-slate-300"
                                                placeholder="e.g. 1 5"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Expected Output</label>
                                            <textarea
                                                value={tc.output}
                                                onChange={(e) => updateTestCase(idx, "output", e.target.value)}
                                                className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900 font-mono h-14 mt-1 focus:border-indigo-500 focus:outline-none placeholder:text-slate-300"
                                                placeholder="e.g. 6"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={tc.isHidden}
                                                onChange={(e) => updateTestCase(idx, "isHidden", e.target.checked)}
                                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-xs font-medium text-slate-600">Hidden Case</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Tips */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-500" /> Hints / Tips
                            </h2>
                            <button
                                type="button"
                                onClick={addTip}
                                className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 border border-slate-200"
                            >
                                + Add
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.tips.map((tip, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        value={tip}
                                        onChange={(e) => handleTipChange(idx, e.target.value)}
                                        placeholder={`Tip #${idx + 1}`}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => removeTip(idx)}
                                        className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}