import { hasSubscribers } from "node:diagnostics_channel";
import db from "../db.js";
import type { QueryResult } from "pg";

interface User {
    id: number,
    email: string,
    password: string;
}

const createUser = async (
    email: string,
    hashedPassword: string
): Promise<User> => {
    const result: QueryResult<User> = await db.query(
        `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password`,
        [email, hashedPassword]
    );

    return result.rows[0]!;
};

const findUserByEmail = async (email: string): Promise<User | null> => {
    const result: QueryResult<User> = await db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0] || null;
};

export default {
    createUser,
    findUserByEmail
};