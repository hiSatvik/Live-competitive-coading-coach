import { useState } from 'react';

export default function ProblemPanel() {
    const [activeTab, setActiveTab] = useState('description'); // 'description' or 'hints'
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
                        <h2 className="text-2xl font-bold font-['Quicksand'] text-gray-900">Two Sum</h2>
                        <p className='leading-relaxed'>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.</p>
                        
                        <div>
                            <h3 className="font-bold mb-2 font-['Quicksand']">Example 1:</h3>
                            <div className="bg-white/60 p-4 rounded-2xl border border-gray-200">
                                <p><strong className="text-gray-600">Input:</strong> nums = [2, 7, 11, 15], target = 9</p>
                                <p><strong className="text-gray-600">Output:</strong> [0, 1]</p>
                                <p><strong className="text-gray-600">Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-2 font-['Quicksand']">Example 2:</h3>
                            <div className="bg-white/60 p-4 rounded-2xl border border-gray-200">
                                <p><strong className="text-gray-600">Input:</strong> nums = [3, 2, 4], target = 6</p>
                                <p><strong className="text-gray-600">Output:</strong> [1, 2]</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-2 font-['Quicksand']">Constraints:</h3>
                            <ul className='list-disc pl-5 space-y-1.5 bg-white/60 p-4 rounded-2xl border border-gray-200 marker:text-gray-400'>
                                <li>2 &le; nums.length &le; 10<sup>4</sup></li>
                                <li>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></li>
                                <li>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></li>
                                <li>Only one valid answer exists.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* 💡 HINTS TAB */}
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