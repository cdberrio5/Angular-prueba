import { Request, Response, Router } from 'express';
import { TaskController } from './../controllers/task.controller';

const router = Router();
const taskController = new TaskController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Route to create a task
router.post('/tasks', asyncHandler((req: Request, res: Response) => taskController.createTask(req, res)));

// Route to get all tasks
router.get('/tasks', asyncHandler((req: Request, res: Response) => taskController.getAllTasks(req, res)));

// Route to get a task by ID
router.get('/tasks/:id', asyncHandler((req: Request, res: Response) => taskController.getTaskById(req, res)));

// Route to update a task by ID
router.put('/tasks/:id', asyncHandler((req: Request, res: Response) => taskController.updateTask(req, res)));

// Route to delete a task by ID
router.delete('/tasks/:id', asyncHandler((req: Request, res: Response) => taskController.deleteTask(req, res)));

export default router;
