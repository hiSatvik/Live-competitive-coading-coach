export async function description(req, res) {

    const { ai, body } = req;
    const message = body.message;

    const systemInstruction = `
    You are an expert competitive programming problem setter. 
    A user have given this problem ${req.body.problem}. 
    Your job is to generate a comprehensive, well-structured coding problem based on their request.

    You MUST return your response as a raw JSON object with the following exact structure, and no extra markdown or text:
    {
        "title": "A short, catchy title for the problem",
        "description": "A clear, detailed paragraph explaining the problem statement. Do not include constraints here.",
        "examples": [{
            "input": "The exact input string/format",
            "output": "The expected output string/format",
            "explanation": "A brief explanation of why the output is correct based on the input."
        }
    ],
    "constraints": [
        "A constraint string (e.g., '1 <= nums.length <= 10^4')",
        "Another constraint string"
    ]
    }
    Ensure the problem is logically sound and the examples are perfectly accurate. Make sure to provide at least two examples.`;

    try {
        console.log(message);
        console.log("This is controller");

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

        res.status(200).json({
            reply: response.text
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}