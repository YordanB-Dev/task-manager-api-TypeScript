import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Service from "../services/task.service.js";
import { AppError } from "../middleware/types/AppError.js";

interface Task {
    id: number,
    title: string,
    description: string,
    userId: number,
    completed: boolean,
    createdAt: Date;
}

export const getAllTasks = asyncHandler (
    async (req: Request, res: Response) => {
        const { search, completed} = req.query;
        const userId = req.user.id;
        if (!userId) {
            throw new AppError("Invalid user", 400);
        };
        const tasks = await Service.getAllTasks(
            userId,
            search as string,
            completed as string
        );
        return res.json(tasks);
    }
)

export const getTaskById = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const userId = req.user.id;
        if (!userId) {
            throw new AppError("Invalid user", 400);
        }
        const task = await Service.getTaskById(id, userId);
        return res.json(task);
    }
);

export const createTask = asyncHandler (
    async (req: Request, res: Response) => {
        const { title, description } = req.body;
        const userId = req.user.id;
        if (!userId) {
            throw new AppError("Invalid user", 400);
        }
        const newTask = await Service.createTask(title, description, userId);
        return res.status(201).json(newTask);
    }
);

export const updateTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const {title, description} = req.body;
        const userId = req.user.id;
        if (!userId) {
            throw new AppError("Invalid user", 400);
        }
        const task = await Service.updateTask(
            id,
            title,
            description,
            userId,
        );
        return res.json(task);
    }
);

export const deleteTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const userId = req.user.id;
        if (!userId) {
            throw new AppError("Invalid user", 400);
        }
        await Service.deleteTask(id, userId);
        return res.status(204).send();
    }
);

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
