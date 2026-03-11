import { useState } from "react";
import axios from "axios";

export default function InputPanel({setdescription}) {

    const [problem, setproblem] = useState("");
    async function getdescription() {
        console.log()
        if(!problem.trim()) return;

        const response = await axios.post("http://localhost:8080/api/v1/playground/start",{
            problem: problem
        });

        setdescription(response.data);
        console.log(response);

        setproblem('');
    }
    return (
        <div className="flex flex-row gap-2">
            <input type="text"
                placeholder="2 Sum"
                onChange={(e) => setproblem(e.target.value)}
                value={problem}
                className="bg-neutral-50 p-2 rounded-2xl text-lg outline-gray-600 border-2 border-gray-600 transition-all duration-300 placeholder:pl-2
                focus:border-b-gray-400 focus:ring-2 focus:ring-gray-300 focus:shadow-inner"
            />
            <button
            onClick={getdescription}
                className="text-xl px-6 py-3 bg-rose-300 rounded-2xl text-white font-bold font-['Quicksand']
                           transition-all duration-300 ease-in-out
                           hover:bg-rose-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-200/60
                           active:scale-95 active:translate-y-0"
            >
                Start!!
            </button>        
        </div>
    )
}