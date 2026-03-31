import type { Request, Response, NextFunction } from "express";

const validateTask = (req: Request, res: Response, next: NextFunction): void => {
    const {title, description} = req.body as {title?: unknown, description?: unknown};

    if(!title || typeof title != "string" || !description || typeof description != "string") {
        const err = new Error("Title and description are required and must be strings") as Error & { status?: number };
        (err as any).status = 400;
        throw err;
    }

    next();
};

export default validateTask;