import React from "react"
import {Editor, type OnChange} from "@monaco-editor/react";

interface CodeEditorProps {
    code: string
    language: string
    onChange: (value: string | undefined) => void

}
export default function CodeEditor({ code, language, onChange }: CodeEditorProps) {
    const handleEditorChange: OnChange = (value) => {
        onChange(value);
    }

    return (
        <div className="h-full w-full overflow-hidden rounded-lg border border-[#2a2a2a]">
            <Editor
                height="100%"
                width="100%"
                theme="vs-dark" // The classic VS Code Dark Theme
                language={language}
                value={code}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false }, // Hide the mini-map to save space
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true, // Resizes automatically
                    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace", // Pro fonts
                    padding: { top: 16 }
                }}
            />
        </div>
    );
}