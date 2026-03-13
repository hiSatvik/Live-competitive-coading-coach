import { Router } from "express";
import { description, generateHint } from "../controllers/playground.js";
import injectAI from "../middleware/ai.js";

const playgroundrouter = Router();

playgroundrouter.post("/start", injectAI, description);
playgroundrouter.post("/generate-hint", injectAI, generateHint);


export default playgroundrouter;