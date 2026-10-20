import taskRepository from "./tasks.repository";
import AppError from "../AppError";


interface Task {
    id: number,
    user_id: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    due_date: Date,
    created_at: Date;
}

interface UpdateTaskData {
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    due_date?: Date;
}

const isValidDate = (value: string | Date): boolean => {
    return !Number.isNaN(new Date(value).getTime());
};

export const taskService = {

    async getAllTasks(user_id: number, status?: string, priority?: string) {

        const allowedStatus  = [
            "todo",
            "in_progress",
            "completed"
        ];

        const allowedPriority  = [
            "low",
            "medium",
            "high"
        ];

        if (status && !allowedStatus.includes(status)) {
            throw new AppError("Invlaid status", 400);
        };

        if (priority && !allowedPriority.includes(priority)) {
            throw new AppError("Invalid priority", 400);
        };

        const result = await taskRepository.getAll(user_id, status, priority);

        return result;
    },


    async getTaskById(id: number, user_id: number) {

        const result = await taskRepository.getById(id, user_id);
        if (!result) {
            new AppError(`Task not found`, 404);
        };

        return result;
    },

    async createTask(user_id: number, title: string, description: string, status: string, priority: string, due_date: Date, created_at: Date) {

        if (!title || title.trim().length === 0) {
            throw new AppError("Invalid title", 400);
        }

        if (description || description.trim().length === 0) {
            throw new AppError("Invalid description", 400);
        }

        const allowedStatus = ["todo", "in_progress", "completed"];

        if (status && !allowedStatus.includes(status)) {
            throw new AppError("Invalid status", 400);
        }

        const allowedPriority = ["low", "medium", "high"];

        if (priority && !allowedPriority.includes(priority)) {
            throw new AppError("Invalid priority", 400);
        }


        const createdAt = new Date();

        const task = await taskRepository.createTask(
            user_id,
            title,
            description,
            status,
            priority,
            due_date,
            created_at
        );

        return task;
    },

    async updateTask(user_id: number, id: number, updateData: UpdateTaskData) {

        if (Object.keys(updateData).length === 0) {
            throw new AppError("Data not found", 404);
        }

        const allowedFields = [
            "title",
            "description",
            "status",
            "priority",
            "due_date"
        ];

        const allowedStatus = [
            "toto",
            "in_progress",
            "completed"
        ];

        const allowedPriority = [
            "low",
            "medium",
            "high"
        ];

        const hasInvalidField = Object.keys(updateData).some((field) => {
            return !allowedFields.includes(field);
        });

        if (hasInvalidField) {
            throw new AppError("Invalid filed", 400);
        };

        if (updateData.title || updateData.title?.trim().length === 0) {
            throw new AppError("Invalid title", 400);
        };

        if (updateData.description || updateData.description?.trim().length === 0) {
            throw new AppError("Invalid description", 400);
        };

        if (updateData.status && !allowedStatus.includes(updateData.status)) {
            throw new AppError("Invalid status", 400);
        };

        if (updateData.priority && !allowedPriority.includes(updateData.priority)) {
            throw new AppError("Invalid priority", 400);
        };

        if (updateData.due_date !== undefined && !isValidDate(updateData.due_date)) {
            throw new AppError("Invalid due date", 400);
        };


        const sanitizedData: UpdateTaskData = {
            ...updateData,
            due_date: updateData.due_date ? new Date(updateData.due_date) : undefined
        }

        const task = await taskRepository.updateTask(id, user_id, sanitizedData);

        if (!task) {
            throw new AppError("No task", 404);
        }

        return task;
    },

    async deleteTask(id: number, user_id: number) {

        const task = await taskRepository.deleteTask(id, user_id);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        return task;
    }
};

export default taskService;
