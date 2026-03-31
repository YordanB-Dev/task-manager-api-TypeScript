import express from 'express';
import userController from './controllers/user.controller.js';
import authMiddleware from './middleware/auth.middleware.js';
import taskController from './controllers/task.controller.js';
import validateTask from './middleware/validateTask.js';

const router = express.Router();

// AUTH
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

// PROTECTED TASK ROUTES
router.post('/task', authMiddleware, validateTask, taskController.createTask);
router.put('/task/:id', authMiddleware, validateTask, taskController.updateTask);
router.delete('/task/:id', authMiddleware, taskController.deleteTask);

// PUBLIC
router.get('/task', taskController.getAllTask);
router.get('/task/:id', taskController.getTaskById);

export default router;