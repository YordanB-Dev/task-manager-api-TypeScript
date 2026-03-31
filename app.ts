import express from "express";
import type { Request, Response } from "express";

import taskRoutes from "./routes.js";
import ErrorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api", taskRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome in backend server");
});

app.use(ErrorHandler);

export default app;