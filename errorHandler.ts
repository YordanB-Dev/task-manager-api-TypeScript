import type { Request, Response, NextFunction } from "express";

interface ErrorWithStatus {
    status?: number,
    message: string;
}

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);

    const error = err as ErrorWithStatus;
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";

    res.status(status).json({ error: message});
};

export default errorHandler;