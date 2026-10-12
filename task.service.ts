import taskRepository from "./tasks.repository";
import AppError from "../AppError";


interface UpdateTaskData {
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    due_date?: Date;
}

export const taskService = {
    async getAllTask(user_id: number, status?: string, priority?: string) {

        const allowedStatus = [
            "todo",
            "in_progress",
            "completed"
        ]

        const allowedPriority = [
            "low",
            "medium",
            "high"
        ]

        if (status && !allowedStatus.includes(status)) {
            throw new AppError(`Invalid status`, 400);
        }

        if (priority && !allowedPriority.includes(priority)) {
            throw new AppError(`Invalid priority`, 400);
        }

        const result = await taskRepository.getAll(user_id, status, priority);
        return result;
    },


    async getTaskById(id: number, user_id: number) {
        const result = await taskRepository.getById(id, user_id);
        if (!result) {
            throw new AppError(`Taks not found`, 404);
        }

        return result;
    },

    async createTask(user_id: number, title: string, description: string, priority: string, due_date: Date) {
        
        if (!title || title.trim().length === 0) {
            throw new AppError(`Invalid title`,  400);
        }

        if (!description || description.trim().length === 0) {
            throw new AppError(`Invalid description`, 400);
        }

        const allowedPriorities = ["low", "medium", "high"];

        if (!allowedPriorities.includes(priority)) {
            throw new AppError(`Invalid priority`, 400);
        }

        const createdAt = new Date();

        const task = await taskRepository.createTask(
            user_id,
            title,
            description,
            priority,
            due_date,
            createdAt
        );

        return task;
    },

    async updateTask(id: number, user_id: number, data: UpdateTaskData) {
        const allowedStatuses = [
            "todo",
            "in_progress",
            "completed"
        ];

        const allowedPriorities = [
            "low",
            "medium",
            "high"
        ];

        if (Object.keys(data).length === 0) {
            throw new AppError(`Invalid task`, 400)
        }

        const allowedFields = [
            "title",
            "description",
            "status",
            "priority",
            "due_date"
        ];

        const hasInvalidField = Object.keys(data).some((field) => {
            return !allowedFields.includes(field);
        });

        if (!hasInvalidField) {
            throw new AppError(`Invalid field`, 400);
        }
        
        if (data.status && !allowedStatuses.includes(data.status)) {
            throw new AppError(`Invalid status`, 400);
        }

        if (data.status && !allowedPriorities.includes(data.status)) {
            throw new AppError(`Invalid priority`, 400);
        }

        const task = await taskRepository.updateTasks(
            id, user_id, data
        );

        if (!task) {
            throw new AppError(`Tassk not found`, 404);
        }

        return task;
    },

    async deleteTask(user_id: number, id: number) {
        const result = await taskRepository.deleteTask(user_id, id);

        if (!result) {
            throw new AppError(`Invlaid task`, 400);
        }

        return result;
    }
};


export default taskService;
