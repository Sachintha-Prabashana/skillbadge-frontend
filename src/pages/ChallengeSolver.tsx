import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/authContext.tsx";
import { useParams } from "react-router-dom";
import {
    RotateCcw, Play, CloudUpload,
    ChevronDown, CheckCircle2, Loader2,
    Maximize2, FileText, Code2
} from "lucide-react";
import { fetchChallengeById, runChallengeCode } from "../services/challenge.ts";
import CodeEditor from "../components/CodeEditor.tsx";
import SuccessModal from "../components/SuccessModal.tsx";
import SolverHeader from "../components/SolverHeader.tsx";
import AiAssistant from "../components/AiAssistant.tsx";

export default function ChallengeSolver() {
    const { id } = useParams();
    const { user, updateUser } = useAuth();

    // --- Data States ---
    const [challenge, setChallenge] = useState<any>(null);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");

    // --- UI States ---
    const [loading, setLoading] = useState(true);
    const [consoleTab, setConsoleTab] = useState("testcase");
    const [isRunning, setIsRunning] = useState(false);
    
    // 🔥 NEW: Mobile Tab State (Problem vs Code)
    const [mobileTab, setMobileTab] = useState<"problem" | "code">("problem");

    // --- Execution Result States ---
    const [testResults, setTestResults] = useState<any[]>([]);
    const [overallStatus, setOverallStatus] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAiOpen, setIsAiOpen] = useState(false);

    // --- 1. Load Challenge Data ---
    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                const data = await fetchChallengeById(id);
                setChallenge(data);
                const starter = data.starterCode?.find((s: any) => s.language === language);
                if (starter) setCode(starter.code);
                else setCode("# No starter code found");
            } catch (err) {
                console.error("Failed to load challenge", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    // --- 2. Handle Language Change ---
    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        const starter = challenge?.starterCode?.find((s: any) => s.language === newLang);
        if (starter) setCode(starter.code);
    };

    // --- 3. Handle Run Code ---
    const handleRun = async () => {
        if (!id) return;
        setIsRunning(true);
        setConsoleTab("result");
        setOverallStatus("");

        // On mobile, auto-switch to code tab to see results
        setMobileTab("code");

        try {
            const response = await runChallengeCode({
                challengeId: id,
                language: language,
                code: code
            });
            setTestResults(response.results);
            setOverallStatus(response.status);

            if (response.status === "PASSED") {
                setShowSuccess(true);
                if (user) {
                    const earnedPoints = challenge.points || 10;
                    updateUser({ points: user.points + earnedPoints });
                }
            }
        } catch (error) {
            setOverallStatus("ERROR");
        } finally {
            setIsRunning(false);
        }
    };

    if (loading) return <div className="h-screen bg-[#1a1a1a] flex items-center justify-center text-slate-500">Loading...</div>;
    if (!challenge) return <div className="h-screen bg-[#1a1a1a] flex items-center justify-center text-red-500">Problem not found.</div>;

    return (
        <div className="flex flex-col h-screen bg-[#1a1a1a] text-white font-sans overflow-hidden relative">

            {/* === 1. TOP NAVBAR (Responsive) === */}
            <SolverHeader
                title={challenge?.title}
                onAiClick={() => setIsAiOpen(!isAiOpen)}
            />

            {/* === AI SLIDE-OUT PANEL === */}
            <AiAssistant
                isOpen={isAiOpen}
                onClose={() => setIsAiOpen(false)}
                challengeId={id || ""}
                code={code}
                language={language}
            />

            {/* === 2. MOBILE TABS (Visible only < 1024px) === */}
            <div className="lg:hidden h-10 bg-[#282828] border-b border-[#3e3e3e] flex">
                <button 
                    onClick={() => setMobileTab("problem")}
                    className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all
                    ${mobileTab === "problem" ? "text-white bg-[#333] border-b-2 border-indigo-500" : "text-slate-500"}`}
                >
                    <FileText className="w-3.5 h-3.5" /> Description
                </button>
                <button 
                    onClick={() => setMobileTab("code")}
                    className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all
                    ${mobileTab === "code" ? "text-white bg-[#333] border-b-2 border-indigo-500" : "text-slate-500"}`}
                >
                    <Code2 className="w-3.5 h-3.5" /> Code & Run
                </button>
            </div>

            {/* === 3. MAIN CONTENT AREA === */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-0 lg:p-2 gap-0 lg:gap-2 bg-[#1a1a1a]">

                {/* --- LEFT PANEL: Problem Description --- */}
                {/* Mobile Logic: Hidden if tab is 'code'
                    Desktop Logic: Always w-1/2 
                */}
                <div className={`
                    flex flex-col bg-[#282828] lg:rounded-lg border-r lg:border border-[#3e3e3e] overflow-hidden
                    ${mobileTab === "code" ? "hidden lg:flex" : "flex w-full"} 
                    lg:w-1/2 h-full
                `}>
                    {/* Desktop Tabs (Hidden on Mobile since we have top bar) */}
                    <div className="h-10 bg-[#333] border-b border-[#3e3e3e] hidden lg:flex items-center px-2 gap-1">
                        <button className="flex items-center gap-2 px-4 h-full text-xs font-medium text-white border-b-2 border-white bg-[#282828]">
                            <span className="text-blue-400">Description</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 lg:p-5 custom-scrollbar">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                            <h1 className="text-lg lg:text-xl font-bold text-white leading-tight">
                                {challenge.title}
                            </h1>
                            {challenge.status === "SOLVED" && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase">Solved</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-2 mb-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                                ${challenge.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-400/10' :
                                challenge.difficulty === 'MEDIUM' ? 'text-amber-400 bg-amber-400/10' : 'text-red-400 bg-red-400/10'}`}>
                                {challenge.difficulty}
                            </span>
                        </div>

                        <div className="text-sm text-slate-300 leading-relaxed space-y-4 pb-10">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h3: ({node, ...props}) => <h3 className="text-white font-bold mt-6 mb-2 text-base" {...props} />,
                                    code: ({node, className, children, ...props}: any) => (
                                        <code className="bg-[#3e3e3e] px-1 py-0.5 rounded text-slate-200 font-mono text-xs" {...props}>{children}</code>
                                    ),
                                    pre: ({node, ...props}) => (
                                        <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#3e3e3e] my-3 overflow-x-auto">
                                            <pre className="text-xs text-slate-300 font-mono" {...props} />
                                        </div>
                                    ),
                                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 marker:text-slate-500" {...props} />
                                }}
                            >
                                {challenge.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL: Editor & Console --- */}
                {/* Mobile Logic: Hidden if tab is 'problem'
                    Desktop Logic: Always w-1/2 
                */}
                <div className={`
                    flex flex-col gap-2 h-full
                    ${mobileTab === "problem" ? "hidden lg:flex" : "flex w-full"} 
                    lg:w-1/2
                `}>

                    {/* EDITOR PANEL */}
                    <div className="flex-1 flex flex-col bg-[#282828] lg:rounded-lg border border-[#3e3e3e] overflow-hidden">
                        {/* Editor Toolbar */}
                        <div className="h-10 bg-[#333] border-b border-[#3e3e3e] flex items-center justify-between px-2 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <select
                                        value={language}
                                        onChange={(e) => handleLanguageChange(e.target.value)}
                                        className="bg-[#3e3e3e] text-xs text-slate-200 hover:text-white px-2 py-1.5 rounded border-none outline-none cursor-pointer appearance-none pr-7 min-w-[80px]"
                                    >
                                        {challenge.allowedLanguages.map((lang: string) => (
                                            <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3e3e3e] rounded" title="Reset Code">
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3e3e3e] rounded hidden sm:block" title="Fullscreen">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Code Area */}
                        <div className="flex-1 min-h-0 relative bg-[#1e1e1e]">
                            <CodeEditor
                                code={code}
                                language={language}
                                onChange={(newCode) => setCode(newCode || "")}
                            />
                        </div>
                    </div>

                    {/* CONSOLE PANEL (Collapsible on Mobile could be a future enhancement) */}
                    <div className="h-[40%] lg:h-48 flex flex-col bg-[#282828] lg:rounded-lg border border-[#3e3e3e] overflow-hidden relative shrink-0">
                        {/* Console Tabs */}
                        <div className="flex items-center bg-[#333] border-b border-[#3e3e3e] h-9 px-1">
                            <button
                                onClick={() => setConsoleTab("testcase")}
                                className={`px-4 h-full text-xs font-medium flex items-center gap-2 transition-colors ${consoleTab === 'testcase' ? 'text-white bg-[#282828] border-t-2 border-transparent' : 'text-slate-400 hover:bg-[#3e3e3e]'}`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> <span className="hidden sm:inline">Testcase</span>
                            </button>
                            <button
                                onClick={() => setConsoleTab("result")}
                                className={`px-4 h-full text-xs font-medium transition-colors ${consoleTab === 'result' ? 'text-white bg-[#282828]' : 'text-slate-400 hover:bg-[#3e3e3e]'}`}
                            >
                                Test Result
                            </button>
                        </div>

                        {/* Console Content */}
                        <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 custom-scrollbar pb-14">
                            {consoleTab === "testcase" ? (
                                <div className="space-y-4">
                                    <div className="text-slate-400 mb-2">Run code to see results against hidden cases.</div>
                                    <div className="bg-[#3e3e3e] p-3 rounded-lg text-slate-200">
                                        (Inputs are hidden for this challenge)
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {isRunning ? (
                                        <div className="flex items-center gap-2 text-slate-400 mt-4 ml-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Running Code...
                                        </div>
                                    ) : overallStatus ? (
                                        <div className="space-y-3">
                                            <div className={`text-sm font-bold ${overallStatus === "PASSED" ? "text-emerald-500" : "text-red-500"}`}>
                                                {overallStatus === "PASSED" ? "Accepted" : "Wrong Answer"}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {testResults.map((res, i) => (
                                                    <div key={i} className={`p-2 rounded min-w-[80px] ${res.passed ? "bg-[#3e3e3e]" : "bg-red-500/10 border border-red-500/20"}`}>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-slate-400 text-[10px]">Case {i + 1}</span>
                                                            <span className={`text-[10px] font-bold ${res.passed ? "text-emerald-400" : "text-red-400"}`}>{res.passed ? "Pass" : "Fail"}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 text-center mt-4">Run code to see results</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons (Fixed at bottom right) */}
                        <div className="absolute bottom-3 right-3 flex gap-2 z-10 bg-[#282828]/80 backdrop-blur-sm p-1 rounded-lg">
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-4 py-1.5 bg-[#3e3e3e] hover:bg-[#4e4e4e] text-white text-xs font-bold rounded transition-colors disabled:opacity-50"
                            >
                                <Play className="w-3 h-3 fill-white inline mr-1.5" /> Run
                            </button>
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-4 py-1.5 bg-[#2cbb5d] hover:bg-[#25a04e] text-white text-xs font-bold rounded transition-colors disabled:opacity-50 shadow-lg shadow-green-900/20"
                            >
                                <CloudUpload className="w-3 h-3 inline mr-1.5" /> Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* === 3. SUCCESS MODAL === */}
            {showSuccess && (
                <SuccessModal
                    onClose={() => setShowSuccess(false)}
                    points={challenge.points || 10}
                />
            )}
        </div>
    );
}