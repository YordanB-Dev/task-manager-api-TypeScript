import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import userService from "../services/user.service.js";

interface AuthBody {
    email: string,
    password: string;
    username: string
}

export const register = asyncHandler (
    async (req: Request, res: Response) => {
        const {email, password, username} = req.body as AuthBody;

        const result = await userService.register(email, password, username);

        return res.status(201).json(result);
    }
);

export const login = asyncHandler (
    async (req: Request, res: Response) => {
        const { email, password, username } = req.body as AuthBody;

        const user = await userService.login(email, password, username);

        return res.status(200).json(user);
    }
);

export default {
    register,
    login
};
