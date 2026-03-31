import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import userService from "../services/user.service.js";
import { log } from "node:console";

interface AuthBody {
    email: string,
    password: string;
}

export const register = asyncHandler (
    async (req: Request, res: Response) => {
        const {email, password} = req.body as AuthBody;

        const result = await userService.register(email, password);

        res.status(201).json(result);
    }
);

export const login = asyncHandler (
    async (req: Request, res: Response) => {
        const {email, password} = req.body as AuthBody;

        const user = await userService.login(email, password);

        res.status(200).json(user);
    }
);

export default {
    register,
    login
};