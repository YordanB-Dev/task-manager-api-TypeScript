import pool from "../db";
import { QueryResult } from "pg";


interface Task {
    id: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    due_date: Date,
    created_at: Date,
    user_id: number;
}

interface UpdateTaskData {
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    due_date?: Date;
}

export const taskRepository = {

    async getAll(user_id: number, status?: string, priority?: string) {
        const result: QueryResult<Task> = await pool.query<Task> (
            `SELECT * FROM tasks WHERE user_id = $1
            AND ($2 IS NULL OR status = $2)
            AND ($3 IS NULL OR priority = $3)`,
            [user_id, status ?? null, priority ?? null]
        );

        return result.rows;
    },

    async getById(id: number, user_id: number) {
        const result: QueryResult<Task> = await pool.query<Task> (
            `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
            [id, user_id]
        );

        return result.rows[0];
    },

    async createTask(user_id: number, title: string, description: string, priority: string, due_date: Date, created_at: Date) {
        
        const result: QueryResult<Task> = await pool.query<Task> (
            `INSERT INTO tasks (user_id, title, description, priority, due_date, created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [user_id, title, description, priority, due_date, created_at]
        );

        return result.rows[0];
    },

    async updateTasks(user_id: number,id: number, data: UpdateTaskData) {
        const result: QueryResult<Task> = await pool.query<Task> (
            `UPDATE SET 
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                status = COALESCE($3, status),
                priority = COALESCE($4, priority),
                due_date = COALESCE ($5, due_date),
                WHERE id = $6 AND user_id = $7
                RETURNING *`,
            [
                data.title ?? null,
                data.description ?? null,
                data.status ?? null,
                data.priority ?? null,
                data.due_date ?? null,
                id,
                user_id
            ]
        );

        return result.rows[0];
    },

    async deleteTask(user_id: number, id: number) {

        const result: QueryResult<Task> = await pool.query<Task> (
            `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, user_id]
        );

        return result.rows[0];
    }
};

export default taskRepository;
