import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const pool = null;

try {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    console.log("Connection is established");
} catch {
    console.error("Database couldn't connect");
}

export default pool;