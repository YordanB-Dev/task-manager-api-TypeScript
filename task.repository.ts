import db from "../db.js";
import type { QueryResult } from "pg";

export const getAllTask = async (userId: number): Promise<QueryResult> => {
    return db.query(`SELECT * FROM task WHERE userId = $1`, [userId]);
};

export const getTaskById = async (id: number, userId: number): Promise<QueryResult> => {
    return db.query(
        `SELECT * FROM task WHERE id = $1 AND userId = $2`,
        [id, userId]
    );
};

export const createTask = async (
    title: string,
    description: string,
    userId: number
): Promise<QueryResult> => {
    return db.query(
        `INSERT INTO task (title, description, userId) VALUES ($1, $2, $3) RETURNING *`,
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
        `UPDATE task SET title = $1, description = $2 WHERE id = $3 AND userId = $4 RETURNING *`,
        [title, description, id, userId]
    );
};

export const deleteTask = async (id: number, userId: number): Promise<QueryResult> => {
    return db.query(
        `DELETE FROM task WHERE id = $1 AND userId = $2 RETURNING *`,
        [id, userId]
    );
};

export default {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
