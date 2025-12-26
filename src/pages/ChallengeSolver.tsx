import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useAuth } from "../context/authContext.tsx";
import { useParams } from "react-router-dom"
import {
    RotateCcw, Play, CloudUpload,
    ChevronDown, CheckCircle2, Loader2,
     Maximize2
} from "lucide-react";
import {fetchChallengeById, runChallengeCode} from "../services/challenge.ts";
import CodeEditor from "../components/CodeEditor.tsx";
import SuccessModal from "../components/SuccessModal.tsx";
import SolverHeader from "../components/SolverHeader.tsx";
import AiAssistant from "../components/AiAssistant.tsx";


export default function ChallengeSolver() {
    const { id } = useParams();

    // --- Data States ---
    const [challenge, setChallenge] = useState<any>(null);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");

    // --- UI States ---
    const [loading, setLoading] = useState(true);
    const [consoleTab, setConsoleTab] = useState("testcase");  // Bottom Right Tab
    const [isRunning, setIsRunning] = useState(false);

    // --- Execution Result States ---
    const [testResults, setTestResults] = useState<any[]>([]);
    const [overallStatus, setOverallStatus] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState(false);

    const [isAiOpen, setIsAiOpen] = useState(false);
    const { user, updateUser } = useAuth(); // <--- ADD THIS

    // --- 1. Load Challenge Data ---
    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                const data = await fetchChallengeById(id);
                console.log(data);
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

        try {
            const response = await runChallengeCode({
                challengeId: id,
                language: language,
                code: code
            });
            setTestResults(response.results);
            setOverallStatus(response.status);

            if (response.status === "PASSED") {
                setShowSuccess(true)

                // --- UPDATE AUTH CONTEXT HERE ---
                if (user) {
                    const earnedPoints = challenge.points || 10; // Default to 10 if undefined

                    // Optimistically update the UI immediately
                    updateUser({
                        points: user.points + earnedPoints
                    });
                }
            }
        } catch (error) {
            setOverallStatus("ERROR");
        } finally {
            setIsRunning(false);
        }
    };

    // const toggleAi = () => {
    //     // Logic to open AI Sidebar/Modal
    //     setIsAiOpen(!isAiOpen);
    // };

    if (loading) return <div className="h-screen bg-[#1a1a1a] flex items-center justify-center text-slate-500">Loading Problem...</div>;
    if (!challenge) return <div className="h-screen bg-[#1a1a1a] flex items-center justify-center text-red-500">Problem not found.</div>;

    return (
        <div className="flex flex-col h-screen bg-[#1a1a1a] text-white font-sans overflow-hidden relative">

            {/* === 1. TOP NAVBAR === */}
            {/*<header className="h-12 bg-[#282828] border-b border-[#3e3e3e] flex items-center justify-between px-4 shrink-0">*/}
            {/*    <div className="flex items-center gap-4">*/}
            {/*        <Link to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">*/}
            {/*            <div className="bg-[#1a1a1a] p-1 rounded">*/}
            {/*                <Code2 className="w-4 h-4 text-white" />*/}
            {/*            </div>*/}
            {/*        </Link>*/}
            {/*        <div className="h-4 w-px bg-[#3e3e3e] mx-2"></div>*/}
            {/*        <div className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer transition-colors">*/}
            {/*            <List className="w-4 h-4" />*/}
            {/*            <span>Problem List</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="flex items-center gap-3">*/}
            {/*        <button className="p-1.5 text-slate-400 hover:bg-[#3e3e3e] rounded transition-colors">*/}
            {/*            <Settings className="w-4 h-4" />*/}
            {/*        </button>*/}
            {/*        <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 overflow-hidden flex items-center justify-center text-xs">*/}
            {/*            U*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</header>*/}

            <SolverHeader
                title={challenge?.title}
                onAiClick={() => setIsAiOpen(!isAiOpen)} // Toggle Logic
            />

            {/*{isAiOpen && (*/}
            {/*    <div className="absolute top-14 right-4 w-80 h-[500px] bg-[#222] border border-[#3e3e3e] rounded-xl shadow-2xl z-50 p-4">*/}
            {/*        <h3 className="text-white font-bold mb-2">AI Assistant</h3>*/}
            {/*        <p className="text-slate-400 text-sm">How can I help you optimize this solution?</p>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* === AI SLIDE-OUT PANEL === */}
            {/* This sits ON TOP of the split view */}
            <AiAssistant
                isOpen={isAiOpen}
                onClose={() => setIsAiOpen(false)}
                challengeId={id || ""}
                code={code}
                language={language}
            />

            {/* === 2. MAIN SPLIT VIEW === */}
            <div className="flex-1 flex overflow-hidden p-2 gap-2 bg-[#1a1a1a]">

                {/* --- LEFT PANEL: Problem Description --- */}
                <div className="w-1/2 flex flex-col bg-[#282828] rounded-lg border border-[#3e3e3e] overflow-hidden">
                    {/* Tabs */}
                    <div className="h-10 bg-[#333] border-b border-[#3e3e3e] flex items-center px-2 gap-1">
                        <button className="flex items-center gap-2 px-4 h-full text-xs font-medium text-white border-b-2 border-white bg-[#282828]">
                            <span className="text-blue-400">Description</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 h-full text-xs font-medium text-slate-400 hover:text-white transition-colors">
                            <span>Solutions</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                        {/* WRAPPER: Flex container to keep Title and Badge in one row */}
                        <div className="flex items-center justify-between gap-3 mb-2">
                            <h1 className="text-xl font-bold text-white">
                                1. {challenge.title}
                            </h1>

                            {/* CONDITIONAL SOLVED LABEL */}
                            {challenge.status === "SOLVED" && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">
                                        Solved
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 mb-6 text-xs">
                            <span className={`px-2.5 py-1 rounded-full font-medium capitalize 
                                ${challenge.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-400/10' :
                                challenge.difficulty === 'MEDIUM' ? 'text-amber-400 bg-amber-400/10' : 'text-red-400 bg-red-400/10'}`}>
                                {challenge.difficulty.toLowerCase()}
                            </span>
                        </div>

                        {/* MARKDOWN RENDERER */}
                        <div className="text-sm text-slate-300 leading-relaxed space-y-4">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h3: ({node, ...props}) => <h3 className="text-white font-bold mt-4 mb-2" {...props} />,
                                    code: ({node, className, children, ...props}: any) => (
                                        <code className="bg-[#3e3e3e] px-1 py-0.5 rounded text-slate-200 font-mono text-xs" {...props}>{children}</code>
                                    ),
                                    pre: ({node, ...props}) => (
                                        <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#3e3e3e] my-3 overflow-x-auto">
                                            <pre className="text-xs text-slate-300 font-mono" {...props} />
                                        </div>
                                    ),
                                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />
                                }}
                            >
                                {challenge.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL: Editor & Console --- */}
                <div className="w-1/2 flex flex-col gap-2">

                    {/* EDITOR PANEL */}
                    <div className="flex-1 flex flex-col bg-[#282828] rounded-lg border border-[#3e3e3e] overflow-hidden">
                        {/* Editor Toolbar */}
                        <div className="h-10 bg-[#333] border-b border-[#3e3e3e] flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <select
                                        value={language}
                                        onChange={(e) => handleLanguageChange(e.target.value)}
                                        className="bg-[#3e3e3e] text-xs text-slate-200 hover:text-white px-2 py-1 rounded border-none outline-none cursor-pointer appearance-none pr-6"
                                    >
                                        {/*<option value="python">Python</option>*/}
                                        {/*<option value="javascript">JavaScript</option>*/}
                                        {/*<option value="java">Java</option>*/}

                                        {challenge.allowedLanguages.map((lang: string) => (
                                            <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3e3e3e] rounded" title="Reset Code">
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3e3e3e] rounded" title="Fullscreen">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Code Area - USING MONACO COMPONENT */}
                        {/* min-h-0 is critical for flex containers to scroll properly */}
                        <div className="flex-1 min-h-0 relative bg-[#1e1e1e]">
                            <CodeEditor
                                code={code}
                                language={language}
                                onChange={(newCode) => setCode(newCode || "")}
                            />
                        </div>
                    </div>

                    {/* CONSOLE PANEL */}
                    <div className="h-48 flex flex-col bg-[#282828] rounded-lg border border-[#3e3e3e] overflow-hidden relative">
                        {/* Console Tabs */}
                        <div className="flex items-center bg-[#333] border-b border-[#3e3e3e] h-9 px-1">
                            <button
                                onClick={() => setConsoleTab("testcase")}
                                className={`px-4 h-full text-xs font-medium flex items-center gap-2 transition-colors ${consoleTab === 'testcase' ? 'text-white bg-[#282828] border-t-2 border-transparent' : 'text-slate-400 hover:bg-[#3e3e3e]'}`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Testcase
                            </button>
                            <button
                                onClick={() => setConsoleTab("result")}
                                className={`px-4 h-full text-xs font-medium transition-colors ${consoleTab === 'result' ? 'text-white bg-[#282828]' : 'text-slate-400 hover:bg-[#3e3e3e]'}`}
                            >
                                Test Result
                            </button>
                        </div>

                        {/* Console Content */}
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300">
                            {consoleTab === "testcase" ? (
                                <div className="space-y-4">
                                    <div className="text-slate-400 mb-2">Run code to see results against hidden cases.</div>
                                    <div className="space-y-1">
                                        <p className="text-slate-500 mb-1">Input Example (from description):</p>
                                        <div className="bg-[#3e3e3e] p-3 rounded-lg text-slate-200">
                                            (Check problem description for inputs)
                                        </div>
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
                                            <div className={`text-base font-bold ${overallStatus === "PASSED" ? "text-emerald-500" : "text-red-500"}`}>
                                                {overallStatus === "PASSED" ? "Accepted" : "Wrong Answer"}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {testResults.map((res, i) => (
                                                    <div key={i} className={`p-3 rounded-lg min-w-[120px] ${res.passed ? "bg-[#3e3e3e]" : "bg-red-500/10 border border-red-500/20"}`}>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-slate-400">Case {i+1}</span>
                                                            <span className={res.passed ? "text-emerald-400" : "text-red-400"}>{res.passed ? "Pass" : "Fail"}</span>
                                                        </div>
                                                        {!res.passed && (
                                                            <div className="mt-2 pt-2 border-t border-red-500/20">
                                                                <div className="text-slate-500 mb-1">Output:</div>
                                                                <div className="text-red-300 bg-[#1a1a1a] p-1 rounded px-2">{res.actualOutput}</div>
                                                                <div className="text-slate-500 mt-2 mb-1">Expected:</div>
                                                                <div className="text-emerald-400 bg-[#1a1a1a] p-1 rounded px-2">{res.expectedOutput}</div>
                                                            </div>
                                                        )}
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

                        {/* Action Buttons */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-5 py-1.5 bg-[#3e3e3e] hover:bg-[#4e4e4e] text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
                            >
                                <Play className="w-3 h-3 fill-white inline mr-1" /> Run
                            </button>
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-5 py-1.5 bg-[#2cbb5d] hover:bg-[#25a04e] text-white text-xs font-medium rounded transition-colors disabled:opacity-50 shadow-lg shadow-green-900/20"
                            >
                                <CloudUpload className="w-3 h-3 inline mr-1" /> Submit
                            </button>
                        </div>

                        {/* === 3. SUCCESS MODAL === */}
                        {showSuccess && (
                            <SuccessModal
                                onClose={() => setShowSuccess(false)}
                                points={challenge.points || 10}
                            />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}