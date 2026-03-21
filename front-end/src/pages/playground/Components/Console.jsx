import { useState, useEffect } from "react";

export default function Console({ consoleOutput, description }) {
    const [activeTab, setActiveTab] = useState(0);

    const testcases = [
        ...(description?.examples || []).map((ex) => ({
            displayInput: ex.displayInput || ex.input,
            input: ex.input,
            expectedOutput: ex.output,
            actualOutput: null,
            passed: null
        })),
        ...(description?.testCases || []).map((tc) => ({
            displayInput: tc.displayInput || tc.input,
            input: tc.input,
            expectedOutput: tc.output,
            actualOutput: null,
            passed: null
        }))
    ];

    // Reset active tab when problem or execution changes, so it stays fresh!
    useEffect(() => {
        setActiveTab(0);
    }, [description, consoleOutput]);

    // Determine console status
    let status = "idle";

    if (consoleOutput?.status) {
        if (consoleOutput.status.includes("Compilation Error")) status = "error";
        else if (consoleOutput.status.includes("Accepted")) status = "success";
        else if (consoleOutput.status.includes("Wrong Answer")) status = "failed";
    }
    else if (consoleOutput?.output?.includes("spinning up")) {
        status = "running";
    }

    const compilationError = consoleOutput?.error || "";

    const hasExecutionResults =
        (status === "success" || status === "failed") &&
        consoleOutput?.results?.length > 0;

    const displayTabs = hasExecutionResults
        ? consoleOutput.results
        : testcases;

    return (
        <div className="bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-4 flex flex-col h-full min-h-0">

            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
                <h2 className="text-xl font-bold text-gray-800 font-['Quicksand']">
                    Console
                </h2>

                {status === "success" && (
                    <span className="text-green-700 font-bold bg-green-200/60 px-4 py-1.5 rounded-2xl text-sm">
                        Accepted ✓
                    </span>
                )}

                {status === "failed" && (
                    <span className="text-red-600 font-bold bg-red-200/60 px-4 py-1.5 rounded-2xl text-sm">
                        Wrong Answer ✗
                    </span>
                )}

                {status === "error" && (
                    <span className="text-rose-600 font-bold bg-rose-200/60 px-4 py-1.5 rounded-2xl text-sm">
                        Compilation Error ⚠
                    </span>
                )}

                {status === "running" && (
                    <span className="text-emerald-700 font-bold bg-emerald-200/60 px-4 py-1.5 rounded-2xl text-sm animate-pulse">
                        Running...
                    </span>
                )}
            </div>

            {/* Console Body */}
            <div className="bg-neutral-50 flex-1 rounded-2xl p-5 overflow-y-auto shadow-inner text-sm min-h-0">

                {/* Empty state */}
                {status === "idle" && displayTabs.length === 0 && (
                    <div className="text-gray-400 h-full flex items-center justify-center italic text-lg">
                        Generate a problem to see test cases here...
                    </div>
                )}

                {/* Running state */}
                {status === "running" && (
                    <div className="text-emerald-500 whitespace-pre-wrap font-bold flex items-center justify-center h-full text-center">
                        {consoleOutput.output}
                    </div>
                )}

                {/* Compilation error */}
                {status === "error" && (
                    <div className="text-rose-500 whitespace-pre-wrap">
                        {compilationError || "Unknown Compilation Error"}
                    </div>
                )}

                {/* Testcases */}
                {status !== "running" && status !== "error" && displayTabs.length > 0 && (
                    <div className="flex flex-col gap-5 pb-4">

                        {/* Tabs for each Case */}
                        <div className="flex gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
                            {displayTabs.map((tc, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-4 py-2 rounded-xl transition-all font-bold text-sm flex items-center gap-2 whitespace-nowrap
                                    ${activeTab === index
                                            ? "bg-white shadow-md text-gray-800"
                                            : "hover:bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full 
                                        ${!hasExecutionResults
                                                ? "bg-gray-300"
                                                : tc.passed
                                                    ? "bg-green-400"
                                                    : "bg-red-400"
                                            }`}
                                    />
                                    Case {index + 1}
                                </button>
                            ))}
                        </div>

                        {/* Active testcase details */}
                        {displayTabs[activeTab] && (
                            <div className="flex flex-col gap-4 mt-1">

                                {/* Input */}
                                <div>
                                    <span className="text-gray-400 font-bold text-xs uppercase">
                                        Input
                                    </span>
                                    <div className="bg-gray-100 p-3 rounded-xl text-gray-700 whitespace-pre-wrap">
                                        {displayTabs[activeTab].displayInput ||
                                            displayTabs[activeTab].input}
                                    </div>
                                </div>

                                {/* Expected Output */}
                                <div>
                                    <span className="text-gray-400 font-bold text-xs uppercase">
                                        Expected
                                    </span>
                                    <div className="bg-gray-100 p-3 rounded-xl text-gray-700 whitespace-pre-wrap">
                                        {displayTabs[activeTab].expectedOutput}
                                    </div>
                                </div>

                                {/* Actual Output */}
                                <div>
                                    <span className="text-gray-400 font-bold text-xs uppercase">
                                        Output
                                    </span>
                                    {!hasExecutionResults ? (
                                        <div className="bg-gray-50 p-3 rounded-xl text-gray-400 italic">
                                            Run your code to see the output...
                                        </div>
                                    ) : (
                                        <div
                                            className={`p-3 rounded-xl break-all font-semibold
                                            ${displayTabs[activeTab].passed
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-red-50 text-red-600"
                                                }`}
                                        >
                                            {displayTabs[activeTab].actualOutput ||
                                                "No output generated"}
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}