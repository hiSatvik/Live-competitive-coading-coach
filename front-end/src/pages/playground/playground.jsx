import InputPanel from "./Components/InputPanel";
import UserPanel from "./Components/UsePanel";
import ProblemPanel from "./Components/ProblemPanel";
import CodeEditor from "./Components/CodeEditor";
import Console from "./Components/Console";
import { useState } from "react";

export default function PlayGround() {
    const [description, setdescription] = useState(null);
    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4 overflow-hidden bg-gray-50">
            
            {/* The Header Region */}
            <div className="flex flex-row justify-between items-center shrink-0">
                <InputPanel setdescription={setdescription}/>
                <UserPanel />
            </div>

            {/* The Main Workspace */}
            <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
                
                {/* Left Side: Problem Panel */}
                {/* overflow-y-auto ensures ONLY the text inside scrolls if it gets too long! */}
                <div className="col-span-1 h-full overflow-y-auto bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-4 rounded-3xl">
                    <ProblemPanel description={description}/>
                </div>

                {/* Right Side: Code Editor (Top) & Console (Bottom) */}
                <div className="col-span-1 h-full flex flex-col gap-4 min-h-0">
                    
                    {/* Code Editor gets flex-[3] so it takes up slightly more room than the console */}
                    <div className="flex-[3] min-h-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <CodeEditor />
                    </div>
                    
                    {/* Console gets the rest of the bottom space */}
                    <div className="flex-[2] min-h-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <Console />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}