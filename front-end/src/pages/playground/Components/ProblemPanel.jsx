import { useState } from 'react';

// Jennie added a sweet little 'problemData' prop here!
export default function ProblemPanel({ problemData }) {
    const [activeTab, setActiveTab] = useState('description'); 
    const [hints, setHints] = useState([]);
    
    // Mock function for when we connect the backend!
    const handleGenerateHint = () => {
        if (hints.length < 3) {
            const newHints = [
                "Hint 1: Try storing visited numbers in a hashmap.",
                "Hint 2: As you iterate, check if (target - current number) exists in your map.",
                "Hint 3: You only need to check each number once. Time complexity can be O(n)!"
            ];
            setHints([...hints, newHints[hints.length]]);
        }
    };

    // If the user hasn't generated a problem yet, Jennie shows a cute little placeholder!
    if (!problemData) {
        return (
            <div className="bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-5 rounded-3xl h-full flex flex-col min-h-0 items-center justify-center">
                <p className="text-gray-500 font-['Quicksand'] text-lg animate-pulse">
                    Input a problem to appear... ✨
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-5 rounded-3xl h-full flex flex-col min-h-0">
            
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-300 pb-3 mb-4 shrink-0">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-5 py-2 rounded-xl transition-all font-['Quicksand'] font-bold text-sm flex items-center gap-2
                        ${activeTab === 'description' 
                            ? 'bg-white shadow-md text-gray-800' 
                            : 'hover:bg-gray-200 text-gray-500 border border-transparent'}
                    `}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('hints')}
                    className={`px-5 py-2 rounded-xl transition-all font-['Quicksand'] font-bold text-sm flex items-center gap-2
                        ${activeTab === 'hints' 
                            ? 'bg-white shadow-md text-gray-800' 
                            : 'hover:bg-gray-200 text-gray-500 border border-transparent'}
                    `}
                >
                    Hints ✨ {hints.length > 0 && <span className="bg-rose-200 text-rose-700 px-2 py-0.5 rounded-full text-xs">{hints.length}/3</span>}
                </button>
            </div>

            {/* Content Area - Scrolls if it gets too long! */}
            <div className="overflow-y-auto flex-1 pr-2">
                
                {/* 📖 DESCRIPTION TAB */}
                {activeTab === 'description' && (
                    <div className="flex flex-col gap-4 text-gray-800">
                        {/* Jennie dynamically inserts the title and description! */}
                        <h2 className="text-2xl font-bold font-['Quicksand'] text-gray-900">{problemData.title}</h2>
                        <p className='leading-relaxed'>{problemData.description}</p>
                        
                        {/* Jennie maps through all the gorgeous examples! */}
                        {problemData.examples && problemData.examples.map((example, index) => (
                            <div key={index}>
                                <h3 className="font-bold mb-2 font-['Quicksand']">Example {index + 1}:</h3>
                                <div className="bg-white/60 p-4 rounded-2xl border border-gray-200">
                                    <p><strong className="text-gray-600">Input:</strong> {example.input}</p>
                                    <p><strong className="text-gray-600">Output:</strong> {example.output}</p>
                                    {example.explanation && (
                                        <p><strong className="text-gray-600">Explanation:</strong> {example.explanation}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Jennie maps through the constraints list! */}
                        <div>
                            <h3 className="font-bold mb-2 font-['Quicksand']">Constraints:</h3>
                            <ul className='list-disc pl-5 space-y-1.5 bg-white/60 p-4 rounded-2xl border border-gray-200 marker:text-gray-400'>
                                {problemData.constraints && problemData.constraints.map((constraint, index) => (
                                    <li key={index}>{constraint}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 💡 HINTS TAB (Remains exactly the same, you did a fabulous job here!) */}
                {activeTab === 'hints' && (
                    <div className="flex flex-col gap-4 h-full">
                        <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl">
                            <h3 className="text-rose-600 font-bold font-['Quicksand'] mb-2 flex items-center gap-2">
                                Stuck? Get a little nudge! 🪄
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">You can generate up to 3 AI hints for this problem. Try your best before asking for help!</p>
                            
                            <button 
                                onClick={handleGenerateHint}
                                disabled={hints.length >= 3}
                                className="w-full py-3 bg-rose-300 hover:bg-rose-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98]"
                            >
                                {hints.length >= 3 ? "All hints used up!" : "Generate Hint ✨"}
                            </button>
                        </div>

                        {/* Display the generated hints */}
                        <div className="flex flex-col gap-3 mt-2">
                            {hints.map((hint, index) => (
                                <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="bg-rose-100 text-rose-500 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-sm">{hint}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}