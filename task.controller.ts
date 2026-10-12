import taskService from "./tasks.service";
import asyncHandler from "../asyncHandler";
import type {Request, Response} from "express";



export const tasksController = {

    getAll: asyncHandler(async(req: Request, res: Response) => {
        const userId = (req as any).user.id
        const status = String(req.query.status as string | undefined);
        const priority = String(req.query.priority as string | undefined);
        const result = await taskService.getAllTask(userId, status, priority);
        return res.status(200).json(result);
    }),

    getById: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;
        const result = await taskService.getTaskById(id, userId);
        return res.status(201).json(result);
    }),

    create: asyncHandler(async(req: Request, res: Response) => {
        const userId = (req as any).user.id
        const {title, description, priority, due_date} = req.body;
        const result = await taskService.createTask(userId, title, description, priority, due_date);
        return res.status(201).json(result);
    }),

    update: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user_id = (req as any).user.id;
        const data = req.body;

        const result = await taskService.updateTask(id, user_id, data);
        return res.status(200).json(result);
    }),

    delete: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;
        const result = await taskService.deleteTask(id, userId)
        return res.status(201).json(result);
    })
};

export default tasksController;
