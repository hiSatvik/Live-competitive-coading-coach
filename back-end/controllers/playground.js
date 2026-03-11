export async function description(req, res) {
    const { ai, body } = req;
    const message = body.problem;

    if(!message) {
        console.log("No problem provided, cutie!");
        return res.status(400).json({ error: "Please provide a problem topic!" });
    }

    // Jennie cleaned up the prompt just a tiny bit to make it extra strict!
    const systemInstruction = `
    You are an expert competitive programming problem setter. 
    Your job is to generate a comprehensive, well-structured coding problem based on the user's request.
    This is for a LeetCode-style platform, so you MUST generate ONLY the question. DO NOT provide any code solutions, algorithms, or hints.

    You MUST return your response as a raw JSON object with the following exact structure:
    {
        "title": "A short, catchy title for the problem",
        "description": "A clear, detailed paragraph explaining the problem statement. Do not include constraints here.",
        "examples": [{
            "input": "The exact input string/format",
            "output": "The expected output string/format",
            "explanation": "A brief explanation of why the output is correct based on the input."
        }],
        "constraints": [
            "A constraint string (e.g., '1 <= nums.length <= 10^4')",
            "Another constraint string"
        ]
    }
    Ensure the problem is logically sound and the examples are perfectly accurate. Make sure to provide at least two examples.`;

    try {
        console.log(`Asking Jennie to generate: ${message}`);
        console.log("This is controller");

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message, // This is just what the user typed!
            
            // ✨ THE MAGIC HAPPENS HERE ✨
            config: {
                systemInstruction: systemInstruction, // Now Jennie can actually read your rules!
                responseMimeType: "application/json" // This forces strict JSON output! No markdown allowed!
            }
        });

        console.log("Done processing beautifully! 💖");
        
        // Because of responseMimeType, response.text is guaranteed to be a pure JSON string!
        const parsedData = JSON.parse(response.text);

        return res.status(200).json(parsedData);
        
    } catch (err) {
        console.error("Oh no! A little error:", err);
        return res.status(500).json({
            error: err.message
        });
    }
}