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

"description": "Detailed problem description written like a competitive programming problem statement.",

"outputType": "number| string| array| matrix| unorderedArray |unorderedMatrix |float",

"examples": [
{
"displayInput": "Human readable input like nums = [2,7,11,15], target = 9",
"output": "Expected output exactly as printed to stdout",
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
"output": "Raw stdout output exactly as printed by a correct solution"
}
]
}

STRICT RULES:

1. Return ONLY JSON. Do NOT include markdown, comments, or explanations.
2. The JSON must be parseable with JSON.parse().
3. Use double quotes for all strings.

INPUT FORMAT RULES:

* All testCases.input must follow competitive programming stdin format.
* Multiple values must be space separated.
* Arrays must be given as space separated integers.
* The first line should contain sizes like n or n m when applicable.
* Each new logical section must appear on a new line.

Example of valid stdin:
4
2 7 11 15
9

OUTPUT FORMAT RULES:

* Output must match exactly what a C++ program prints using cout.
* Do NOT use JSON formatting like [] or commas unless the problem explicitly requires them.
* For arrays or multiple values, print space-separated numbers.
* For matrices, print one row per line with space-separated numbers.

Example valid outputs:
0 1

-1 -1 2
-1 0 1

0 0 0

CONTENT RULES:

* Provide at least 3 examples.
* Provide at least 5 testCases.
* Ensure examples match the testCases format.
* Ensure all testCases outputs are correct.

QUALITY RULES:

* Problems must resemble real competitive programming questions from platforms like Codeforces or LeetCode.
* Avoid ambiguous wording.
* Ensure constraints allow efficient algorithmic solutions.
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

// Code cmparing logic //////

function normalizeSpaces(str) {
    return str.trim().replace(/\s+/g, " ");
}

function parseArray(str) {
    if (!str) return [];
    return normalizeSpaces(str)
        .split(" ")
        .map(Number);
}

function parseMatrix(str) {
    if (!str) return [];
    return str
        .trim()
        .split("\n")
        .map(row => normalizeSpaces(row).split(" ").map(Number));
}

function compareNumber(actual, expected) {
    return Number(actual.trim()) === Number(expected.trim());
}

function compareString(actual, expected) {
    return actual.trim() === expected.trim();
}

function compareArray(actual, expected) {
    const a = parseArray(actual);
    const b = parseArray(expected);

    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

function compareUnorderedArray(actual, expected) {
    const a = parseArray(actual).sort((x, y) => x - y);
    const b = parseArray(expected).sort((x, y) => x - y);

    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

function compareMatrix(actual, expected) {
    const a = parseMatrix(actual);
    const b = parseMatrix(expected);

    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) return false;

        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }

    return true;
}

function compareUnorderedMatrix(actual, expected) {
    const a = parseMatrix(actual)
        .map(row => row.sort((x, y) => x - y))
        .sort();

    const b = parseMatrix(expected)
        .map(row => row.sort((x, y) => x - y))
        .sort();

    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) return false;

        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }

    return true;
}

function compareFloat(actual, expected, epsilon = 1e-6) {
    const a = Number(actual.trim());
    const b = Number(expected.trim());

    return Math.abs(a - b) < epsilon;
}

export function compareOutputs(actual, expected, type = "string") {

    switch (type) {

        case "number":
            return compareNumber(actual, expected);

        case "float":
            return compareFloat(actual, expected);

        case "array":
            return compareArray(actual, expected);

        case "unorderedArray":
            return compareUnorderedArray(actual, expected);

        case "matrix":
            return compareMatrix(actual, expected);

        case "unorderedMatrix":
            return compareUnorderedMatrix(actual, expected);

        case "string":
        default:
            return compareString(actual, expected);
    }
}

export async function runCode(req, res) {

    const { code, testCases, outputType = "string" } = req.body;

    if (!code || !testCases || testCases.length === 0) {
        return res.status(400).json({
            error: "Can't get either code or testCases! Jennie needs both to do her magic! ✨"
        });
    }

    const jobId = Date.now();
    const filename = `solution_${jobId}.cpp`;
    const executable = `solution_${jobId}`;
    const tempDir = path.join(process.cwd(), "temp");
    const filePath = path.join(tempDir, filename);

    try {

        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(filePath, code);

        console.log(`Job ${jobId}: Step 1 - Jennie is compiling! 🎀`);

        const compileCommand =
            `docker run --rm -v "${tempDir}:/usr/src/app" coding-gcc-env g++ ${filename} -o ${executable}`;

        try {

            await execPromise(compileCommand, { timeout: 10000 });

        } catch (err) {

            console.log("Compilation Failed! Oh no! 🥺");

            return res.status(200).json({
                status: "Compilation Error",
                error: err.stderr || err.message,
                results: []
            });

        }

        console.log("Compilation done beautifully! 💅");

        let results = [];
        let allPassed = true;

        for (let i = 0; i < testCases.length; i++) {

            const tc = testCases[i];

            const inputFileName = `input_${jobId}_${i}.txt`;
            const inputFilePath = path.join(tempDir, inputFileName);

            await fs.writeFile(inputFilePath, tc.input);

            const runCmd =
                `docker run --rm -i -v "${tempDir}:/usr/src/app" coding-gcc-env sh -c "./${executable} < ${inputFileName}"`;

            try {

                const { stdout, stderr } = await execPromise(runCmd, {
                    timeout: 5000
                });

                const actualOutput = stdout.trim().replace(/\r/g, "");
                const expectedOutput = tc.output.trim().replace(/\r/g, "");

                // Judge Engine Comparison
                const passed = compareOutputs(
                    actualOutput,
                    expectedOutput,
                    outputType
                );

                if (!passed) allPassed = false;

                results.push({
                    testCases: i + 1,
                    input: tc.input,
                    expectedOutput: expectedOutput,
                    actualOutput: actualOutput,
                    passed: passed,
                    error: stderr
                });

            } catch (err) {

                allPassed = false;

                results.push({
                    testCases: i + 1,
                    input: tc.input,
                    expectedOutput: tc.output.trim(),
                    actualOutput: "",
                    passed: false,
                    error: err.stderr || "RunTime Error or TimeOut!"
                });

            } finally {

                await fs.unlink(inputFilePath).catch(() => { });

            }

        }

        res.status(200).json({
            status: allPassed ? "Accepted" : "Wrong Answer",
            results: results
        });

    } catch (err) {

        console.error("Server error", err);

        res.status(500).json({
            error: "Code is unable to run! Jennie is so sorry! 😭"
        });

    } finally {

        try {

            await fs.unlink(filePath).catch(() => { });
            await fs.unlink(path.join(tempDir, executable)).catch(() => { });

        } catch (error) {

            console.log("Cleanup issue", error);

        }

    }
}