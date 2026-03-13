import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { error } from 'console';
import { stat } from 'fs';

// This lets Jennie use beautiful async/await with our terminal commands!
const execPromise = util.promisify(exec);

export async function description(req, res) {
    const { ai, body } = req;
    const message = body.problem;

    if (!message) {
        console.log("No problem provided, cutie!");
        return res.status(400).json({ error: "Please provide a problem topic!" });
    }

    // Jennie cleaned up the prompt just a tiny bit to make it extra strict!
    const systemInstruction = `
        You are an expert competitive programming problem setter.

        Return ONLY a valid JSON object with this exact structure:

        {
        "title": "Problem title",

        "description": "Detailed problem description",

        "examples": [
        {
        "displayInput": "Human readable input like nums = [2,7,11,15], target = 9",
        "output": "Expected output",
        "explanation": "Short explanation"
        }
        ],

        "constraints": [
        "Constraint text"
        ],

        "testCases": [
        {
        "displayInput": "Human readable version of the input",
        "input": "Raw stdin input exactly as typed into a C++ program",
        "output": "Raw stdout output"
        }
        ]
        }

        RULES:
        - Provide at least 3 examples.
        - Provide at least 5 testCases.
        - input must follow stdin format.
        - displayInput must be clean and human-readable.
        - Return ONLY JSON.
    `;

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

export async function generateHint(req, res) {
    const { ai, body } = req;

    // We expect the frontend to tell us the problem details and which hint we are on!
    const { title, description, hintNumber } = body;

    if (!title || !description) {
        console.log("Uh oh, no problem data for the hint!");
        return res.status(400).json({ error: "Jennie needs the problem details to give a perfect hint! 🎀" });
    }

    // Jennie's super smart prompt to generate progressive hints!
    const systemInstruction = `
    You are an expert, encouraging competitive programming coach.
    The user is currently solving this problem:
    Title: ${title}
    Description: ${description}

    They are asking for Hint #${hintNumber}. 
    - If Hint 1: Give a gentle, high-level nudge about the overall approach or data structure.
    - If Hint 2: Be more specific about the logic or step-by-step mechanism.
    - If Hint 3: Give away the core algorithm or math formula, but STILL DO NOT provide direct code.
    Keep the hint friendly, brief, and formatted as plain text.

    You MUST return your response as a raw JSON object with this exact structure:
    {
        "hint": "The text of your helpful hint."
    }
    `;

    try {
        console.log(`Jennie is thinking of Hint #${hintNumber} for: ${title} ✨`);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Please give me hint number ${hintNumber}`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json" // Forcing strict, lovely JSON again!
            }
        });

        const parsedData = JSON.parse(response.text);

        console.log("Hint generated beautifully! 💖");
        res.status(200).json(parsedData);

    } catch (err) {
        console.error("Oh no! Jennie caught a little error:", err);
        res.status(500).json({
            error: err.message
        });
    }
}

export async function runCode(req, res) {
    const { code, testCases } = req.body;

    if (!code || !testCases || testCases.length === 0)
        return res.status(400).json({
            error: "Can't get either code or testCases"
        });

    const jobId = Date.now();
    const filename = `solution_${jobId}.cpp`;
    const executable = `solution_${jobId}`;
    const tempDir = path.join(process.cwd(), 'temp');
    const filePath = path.join(tempDir, filename);

    try {
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(filePath, code);

        console.log(`Jod ${jobId}: Step 1 - Compiling...`);

        const compileCommand = `docker run --rm -v "${tempDir}:/usr/src/app" coding-gcc-env g++ ${filename} -o ${executable}`;

        try {
            await execPromise(compileCommand, { timeout: 10000 });
        } catch (err) {
            console.log("Compilation Failed");
            return res.status(200).json({
                status: "Compliation Error",
                error: err.stderr || err.message,
                results: []
            });
        }

        console.log("Compilation done");

        let results = [];
        let allPassed = true;

        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];

            const inputFileName = `input_${jobId}_${i}.txt`;
            const inputFilePath = path.join(tempDir, inputFileName);
            await fs.writeFile(inputFilePath, tc.input);

            const runCmd = `docker run --rm -i -v "${tempDir}:/usr/src/app" coding-gcc-env sh -c "./${executable} < ${inputFileName}"`;

            try {
                const { stdout, stderr } = await execPromise(runCmd, {
                    timeout: 5000
                });

                const actualOutput = stdout.trim();
                const expectedOutput = tc.output.trim();
                const passed = actualOutput == expectedOutput;

                if (!passed) allPassed = false;

                results.push({
                    testCases: i + 1,
                    input: tc.input,
                    expectedOutput: expectedOutput,
                    actualOutput: actualOutput,
                    passed: passed,
                    error: stderr,
                });
            } catch (err) {
                allPassed = false;
                results.passed({
                    testCases: i + 1,
                    input: tc.input,
                    expectedOutput: tc.output.trim(),
                    actualOutput: "",
                    passed: false,
                    error: runErr.stderr || "RunTime Error or TimeOut!"
                });
            } finally {
                await fs.unlink(inputFilePath).catch(() => { });
            }
        }

        res.status(200).json({
            status: allPassed ? "Accepted" : "Wrong Answer",
            results: results,
        });
    } catch (err) {
        console.error("Server error", err);
        res.status(500).json({
            error: "Code is unable to run"
        })
    } finally {
        try {
            await fs.unlink(filePath).catch(() => { });
            await fs.unlink(path.join(tempDir, executable)).catch(() => { });
        } catch (error) {
            console.log("Cleanup issue", cleanupErr);
        }
    }
}