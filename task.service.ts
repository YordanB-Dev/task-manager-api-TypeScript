import repo from "../repositories/task.repository.js";
import type { QueryResult } from "pg";

interface Task {
    id: number,
    title: string,
    description: string,
    userId: number
};

export const getAllTask = async (): Promise<Task[]> => {
    const result: QueryResult<Task> = await repo.getAllTask();
    return result.rows;
};

export const getTaskById = async (id: number): Promise<Task> => {
    const result: QueryResult<Task> = await repo.getTaskById(id);

    if (result.rows.length === 0) {
        const err = new Error("Task not found");
        (err as any).status = 404;
        throw err;
    };

    return result.rows[0]!;
};

export const createTask = async (
    title: string,
    description: string,
    userId: number
): Promise<Task> => {
    if (!title || !description || !userId) {
        const err = new Error("Missing required fields");
        (err as any).status = 400;
        throw err;
    };

    const result: QueryResult<Task> = await repo.createTask(
        title,
        description,
        userId
    );

    return result.rows[0]!;
};

export const updateTask = async (
    id: number,
    title: string,
    description: string,
    userId: number
): Promise<Task> => {
    const result: QueryResult<Task> = await repo.updateTask(
        id,
        title,
        description,
        userId,
    );

    if (result.rows.length === 0) {
        const err = new Error("Task not found");
        (err as any).status = 404;
        throw err;
    };

    return result.rows[0]!;
};

export const deleteTask = async (id: number): Promise<Task> => {
    const result: QueryResult<Task> = await repo.deleteTask(id);

    if (result.rows.length === 0) {
        const err = new Error("Task not found");
        (err as any).status = 404;
        throw err;
    };

    return result.rows[0]!;
};

export default {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};