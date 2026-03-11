import dotenv from "dotenv";
import express from "express";
import playgroundrouter from "./routers/playground.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/playground",playgroundrouter);

app.listen(PORT, () => {
    console.log(`Port is started at: ${PORT}`);
});