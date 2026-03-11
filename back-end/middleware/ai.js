import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({});

const injectAI = (req, res, next) => {
    req.ai = ai;

    console.log("This the router");

    next();
};

export default injectAI;
