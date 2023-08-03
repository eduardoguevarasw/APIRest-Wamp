import { createPool } from "mysql2/promise";
import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    PORT
} from "./config.js";

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "wampuna",
    port:"8889",
})

