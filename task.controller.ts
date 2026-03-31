import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import * as Service from "../services/task.service.js";

export const getAllTask = asyncHandler (
    async (req: Request, res: Response) => {
        const task = await Service.getAllTask();
        return res.json(task);
    }
);

export const getTaskById = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const task = await Service.getTaskById(id);
        return res.json(task);
    }
);

export const createTask = asyncHandler (
    async (req: Request, res: Response) => {
        const {title, description, userId} = req.body;

        const task = await Service.createTask(
            title,
            description,
            userId
        );

        return res.status(201).json(task);
    }
);

export const updateTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const {title, description, userId} = req.body;

        const task = await Service.updateTask(
            id,
            title,
            description,
            userId
        );

        return res.json(task);
    }
);

export const deleteTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        await Service.deleteTask(id);
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
