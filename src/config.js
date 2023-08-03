import { config } from "dotenv";

config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_NAME = process.env.DB_NAME || "wampuna";
const PORT = process.env.PORT || 3000;

export{
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    PORT
}