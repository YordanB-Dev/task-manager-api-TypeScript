import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Service from "../services/task.service.js";
import type { QueryResult } from "pg";
import type { equal } from "node:assert";

interface Task {
    id: number,
    title: string,
    description: string,
    userId: number,
    completed: boolean,
    createdAt: Date;
}

export const getAllTask = asyncHandler (
    async (req: Request, res: Response) => {
        const userId = req.user.id

        const tasks = await Service.getAllTask(userId);

        return res.json(tasks);
    }
);

export const getTaskById = asyncHandler (
    async (req: Request, res: Response) => {

        const id = Number(req.params.id);

        const userid = req.user.id;

        const task = await Service.getTaskById(id, userid);

        return res.json(task);
    }
);

export const createTask = asyncHandler (
    async (req: Request, res: Response) => {

        const { title, description } = req.body;

        const userId = req.user.id;

        const newTask = await Service.createTask(title, description, userId);

        return res.status(201).json(newTask);
    }
);

export const updateTask = asyncHandler (
    async (req: Request, res: Response) => {

        const id = Number(req.params.id);

        const {title, description} = req.body;

        const userId = req.user.id;

        const updatedTask = await Service.updateTask(
            id,
            title,
            description,
            userId,
        );

        return res.json(updatedTask);
    }
);

export const deleteTask = asyncHandler (
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const userId = req.user.id;

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
