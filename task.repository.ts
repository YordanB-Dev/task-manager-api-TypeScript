import db from "../db.js";
import type { QueryResult } from "pg";

const getAllTasks = async (
    userId: number,
    search?: string,
    completed?: string
) => {

    let query = `SELECT * FROM tasks WHERE "userId" = $1`;
    const values: any[] = [userId];
    if(search && search.trim() !== "") {
        values.push(`%${search}%`);
        query += ` AND title ILIKE $${values.length}`;
    }

    if(completed !== undefined) {
        values.push(completed === "true");
        query += ` AND completed $${values.length}`;
    }

    query += `ORDER BY created_at DESC`;

    console.log(query);
    console.log(values);

    return db.query(query, values);
};

export const getTaskById = async (id: number, userId: number): Promise<QueryResult> => {
    return db.query(
        `SELECT * FROM task WHERE id = $1 AND "userId" = $2`,
        [id, userId]
    );
};

export const createTask = async (
    title: string,
    description: string,
    userId: number
): Promise<QueryResult> => {
    return db.query(
        `INSERT INTO task (title, description, "userId") VALUES ($1, $2, $3) RETURNING id`,
        [title, description, userId]
    );
};

export const updateTask = async (
    id: number,
    title: string,
    description: string,
    userId: number
): Promise<QueryResult> => {
    return db.query(
        `UPDATE task SET title = $1, description = $2 WHERE id = $3 AND "userId" = $4 RETURNING *`,
        [title, description, id, userId]
    );
};

export const deleteTask = async (id: number, userId: number): Promise<QueryResult> => {
    return db.query(
        `DELETE FROM task WHERE id = $1 AND "userId" = $2 RETURNING *`,
        [id, userId]
    );
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
