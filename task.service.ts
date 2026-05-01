import { AppError } from "../middleware/types/AppError.js";
import repo from "../repositories/task.repository.js";
import type { QueryResult } from "pg";


interface Task {
    title: string,
    description: string,
    userId: number,
    search?: boolean,
    completed: Date,
    page: string,
    limit: string,
    sort: string;
}

export const getAllTasks = async (
    userId: number,
    search?: string,
    completed?: string,
    page: string | number = 1,
    limit: string | number = 10,
    sort: string = "desc"
): Promise<Task[]> => {

    const result = await repo.getAllTasks(
        userId,
        search,
        completed,
        page.toString(),
        limit.toString(),
        sort
    );

    return result.data;
};

export const getTaskById = async (id: number, userId: number): Promise<Task> => {
    const result: QueryResult<Task> = await repo.getTaskById(id, userId);
    if (result.rows.length === 0) {
        throw new AppError("Task not found", 404);
    };

    return result.rows[0]!;
};

export const createTask = async (
    title: string,
    description: string,
    userId: number
): Promise<Task> => {
    if (!title?.trim() || !description?.trim()) {
        throw new AppError("Title, and description are required", 400);
    };

    if (title.length > 100) {
        throw new AppError("title is too long (max 100 character)", 400);
    };

    if (description.length > 1000) {
        throw new AppError("Description is too long (max 1000 character)", 400);
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
        userId
    );

    if (result.rows.length === 0) {
        throw new AppError("Task not found", 404)
    };

    return result.rows[0]!;
};

export const deleteTask = async (id: number, userId: number): Promise<Task> => {
    const result: QueryResult<Task> = await repo.deleteTask(id, userId);

    if (result.rows.length === 0) {
        throw new AppError("Task not found", 400);
    };

    return result.rows[0]!;
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
