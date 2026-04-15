import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Service from "../services/task.service.js";

export const getAllTask = asyncHandler (
    async (req: Request, res: Response) => {
        const userId = req.user.id;
        const Task = await Service.getAllTask(userId);

        return res.json(Task);
    }
);

export const getTaskById = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        
        const userId = req.user.id;

        if (!userId) {
            throw new AppError("Invalid user", 401);
        };

        const Task = await Service.getTaskById(id, userId);

        return res.json(Task);
    }
);

export const createTask = asyncHandler (
    async (req: Request, res: Response) => {
        const {title, description} = req.body;

        const userId = req.user.id;

        if (!userId) {
            throw new AppError("Invalid user", 401);
        };

        const Task = await Service.createTask(
            title,
            description,
            userId
        );

        return res.status(201).json(Task);
    }
);

export const updateTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const {title, description} = req.body

        const userId = req.user.id;

        if (!userId) {
            throw new AppError("Invalid user", 401);
        };

        const Task = await Service.updateTask(
            id,
            title,
            description,
            userId
        );

        return res.json(Task);
    }
);

export const deleteTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const userId = req.user.id;

        if (!userId) {
            throw new AppError("Invalid user", 401);
        };

        await Service.deleteTask(id, userId);

        return res.status(204).send();
    }
);

export default {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
