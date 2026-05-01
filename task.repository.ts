import db from "../db.js";
import type { QueryResult } from "pg";

export const getAllTasks = async (
    userId: number,
    search?: string,
    completed?: string,
    page: string = "1",
    limit: string = "10",
    sort: string = "desc"
) => {

    let filterQuery = ` SELECT * FROM tasks WHERE "userId" = $1`;
    const values: any[] = [userId];

    if (search && search.trim() !== "") {
        values.push(`%${search}%`);
        filterQuery += ` AND title ILIKE $${values.length}`;
    }

    if (completed !== undefined) {
        values.push(completed === "true");
        filterQuery += ` AND completed $${values.length}`;
    }

    const countQuery = ` SELECT COUNT (*) FROM tasks ${filterQuery}`;
    const countValues = [...values];
    const countResult = await db.query(countQuery, countValues);
    const totalItems = Number(countResult.rows[0].count)

    const sortOrder = sort === "asc" ? "ASC" : "DESC";

    let dataQuery = `
        SELECT * FROM tasks
        ${filterQuery}
        ORDER BY created_at ${sortOrder}
    `;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Number(limit) || 10);
    const offset = (pageNum - 1) * limitNum;

    values.push(limitNum);
    dataQuery += ` LIMIT $${values.length}`;

    values.push(offset);
    dataQuery += ` OFFSET $${values.length}`;

    const dataResult = await db.query(dataQuery, values);

    return {
        data: dataResult.rows,
        meta: {
            totalItems,
            itemCount: dataResult.rows.length,
            itemsPerPage: limitNum,
            totalPages: Math.ceil(totalItems / limitNum),
            currentPage: pageNum
        }
    };
};

export const getTaskById = async ( id: number, userId: number): Promise<QueryResult> => {
    return db.query(
        `SELECT * FROM tasks WHERE id = $1 AND WHERE "userId" = $2`,
        [ id, userId ]
    );
};

export const createTask = async (
    title: string,
    description: string,
    userId: number
): Promise<QueryResult> => {
    return db.query (
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
    return db.query (
        `UPDATE task SET title = $1, description = $2 WHERE id = $3 AND "userId" = $4 RETURNING *`,
        [title, description, id, userId]
    );
};

export const deleteTask = async (id: number, userId: number): Promise<QueryResult> => {
    return db.query(
        `SELECT * FROM task WHERE id = $1 AND WHERE "userId" = $2 RETURNING *`,
        [id, userId]
    );
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}
