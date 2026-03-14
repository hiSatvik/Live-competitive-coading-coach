import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({userCode}) {
    const [language, setLanguage] = useState("javascript");



    const defaultCode = {
        cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your magical code here\n    return 0;\n}",
        javascript: "function twoSum(nums, target) {\n    // Write your magical code here\n};\n",
        python: "def twoSum(nums, target):\n    # Write your magical code here\n    pass\n",
        java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your magical code here\n    }\n}"
    };

    const [code, setCode] = useState(defaultCode["cpp"]);

    useEffect(() => {
        setCode(defaultCode[language]);
    }, [language]);

    return (
        <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            
            {/* Jennie's Cute Toolbar */}
            <div className="flex justify-between items-center bg-gradient-to-r from-[#ededed] to-[#e6e6e6] px-5 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-['Quicksand'] font-bold text-sm uppercase tracking-wider">
                        Language
                    </span>
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-white px-3 py-1.5 rounded-xl text-sm font-['Quicksand'] font-semibold text-gray-700 outline-none shadow-sm focus:ring-2 focus:ring-rose-300 transition-all cursor-pointer"
                    >
                        <option value="cpp">C++</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-300 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-200 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-300 shadow-inner"></div>
                </div>
            </div>

            {/* The Actual Monaco Editor - Jennie added a strict height here! */}
            <div className="w-full bg-white pt-4 pb-2 h-[450px]"> 
                <Editor
                    height="100%"
                    language={language}
                    theme="light" 
                    value={code}  
                    onChange={(newCode) => userCode(newCode)} 
                    options={{
                        fontSize: 16,
                        fontFamily: "'Cascadia Mono', monospace",
                        minimap: { enabled: false },
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        padding: { top: 10 }, // Gave it a little breathing room at the top!
                        roundedSelection: true,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}