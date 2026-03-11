import { useState } from 'react';

export default function Console({
    status = "failed", // 'idle', 'running', 'success', 'failed', 'error'
    compilationError = null,
    testcases = [
        { id: 1, passed: true, input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", received: "[0,1]" },
        { id: 2, passed: true, input: "nums = [3,2,4], target = 6", expected: "[1,2]", received: "[1,2]" },
        { id: 3, passed: false, input: "nums = [3,3], target = 6", expected: "[0,1]", received: "[1,1]" }
    ],
    aiFeedback = {
        rating: "8/10",
        feedback: "Good approach using hashmap. Time complexity O(n).",
        runtime: "24 ms",
        memory: "10 MB"
    }
}) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        // Jennie removed min-h-[400px] and added min-h-0 so it fits its parent perfectly!
        <div className="bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-4 flex flex-col h-full min-h-0">
            
            {/* Console Header - Jennie added shrink-0 so the header never gets squished */}
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 font-['Quicksand']">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M4 15h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                    Console
                </h2>
                {status === 'success' && <span className="text-green-700 font-bold bg-green-200/60 px-4 py-1.5 rounded-2xl text-sm font-['Quicksand'] shadow-sm">Accepted ✓</span>}
                {status === 'failed' && <span className="text-red-600 font-bold bg-red-200/60 px-4 py-1.5 rounded-2xl text-sm font-['Quicksand'] shadow-sm">Wrong Answer ✗</span>}
                {status === 'error' && <span className="text-rose-600 font-bold bg-rose-200/60 px-4 py-1.5 rounded-2xl text-sm font-['Quicksand'] shadow-sm">Compilation Error ⚠</span>}
            </div>

            {/* Console Body - Jennie added min-h-0 here too so the inner scroll works! */}
            <div className="bg-neutral-50 flex-1 rounded-2xl p-5 overflow-y-auto shadow-inner font-['Cascadia_Mono'] text-sm min-h-0">
                
                {status === 'idle' && (
                    <div className="text-gray-400 h-full flex items-center justify-center italic font-['Quicksand'] text-lg">
                        Run or submit your code to see the results here...
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-rose-500 whitespace-pre-wrap leading-relaxed">
                        {compilationError || "Compilation Error:\nmissing semicolon on line 12"}
                    </div>
                )}

                {(status === 'success' || status === 'failed') && (
                    <div className="flex flex-col gap-5 pb-4">
                        {/* AI Feedback Section */}
                        {aiFeedback && (
                            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-1 shadow-sm shrink-0">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-rose-500 font-['Quicksand'] text-lg flex items-center gap-1">
                                        ✨ AI Interview Rating: {aiFeedback.rating}
                                    </h3>
                                    <div className="text-xs text-gray-500 flex gap-4 font-['Quicksand']">
                                        <span className="bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-100">Runtime: <span className="font-bold text-gray-700">{aiFeedback.runtime}</span></span>
                                        <span className="bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-100">Memory: <span className="font-bold text-gray-700">{aiFeedback.memory}</span></span>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-['Quicksand'] leading-relaxed">{aiFeedback.feedback}</p>
                            </div>
                        )}

                        {/* Testcase Tabs */}
                        <div className="flex gap-2 border-b border-gray-200 pb-3 shrink-0">
                            {testcases.map((tc, index) => (
                                <button
                                    key={tc.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-4 py-2 rounded-xl transition-all font-['Quicksand'] font-bold text-sm flex items-center gap-2
                                        ${activeTab === index 
                                            ? 'bg-white shadow-md text-gray-800' 
                                            : 'hover:bg-gray-200 text-gray-500 border border-transparent'}
                                    `}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full shadow-inner ${tc.passed ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                    Case {index + 1}
                                </button>
                            ))}
                        </div>

                        {/* Active Testcase Details */}
                        <div className="flex flex-col gap-4 mt-1">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-gray-400 font-['Quicksand'] font-bold text-xs uppercase tracking-widest pl-1">Input</span>
                                <div className="bg-gray-100 p-3 rounded-xl text-gray-700 break-all border border-gray-200/60 shadow-inner">
                                    {testcases[activeTab].input}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-gray-400 font-['Quicksand'] font-bold text-xs uppercase tracking-widest pl-1">Expected</span>
                                <div className="bg-gray-100 p-3 rounded-xl text-gray-700 break-all border border-gray-200/60 shadow-inner">
                                    {testcases[activeTab].expected}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-gray-400 font-['Quicksand'] font-bold text-xs uppercase tracking-widest pl-1">Output</span>
                                <div className={`p-3 rounded-xl break-all font-semibold shadow-inner border ${testcases[activeTab].passed ? 'bg-green-50/50 text-green-600 border-green-100' : 'bg-red-50/50 text-red-600 border-red-100'}`}>
                                    {testcases[activeTab].received}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}