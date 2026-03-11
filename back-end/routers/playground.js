import { Router } from "express";
import { description } from "../controllers/playground.js";
import injectAI from "../middleware/ai.js";

const playgroundrouter = Router();

playgroundrouter.post("/start", injectAI, description);


export default playgroundrouter;