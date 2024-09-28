import { Request, Response, Router } from 'express';
import { TaskController } from './../controllers/task.controller';

const router = Router();
const taskController = new TaskController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Ruta para crear una tarea
router.post('/tasks', asyncHandler((req: Request, res: Response) => taskController.createTask(req, res)));

// Ruta para obtener todas las tareas
router.get('/tasks', asyncHandler((req: Request, res: Response) => taskController.getAllTasks(req, res)));

// Ruta para obtener una tarea por ID
router.get('/tasks/:id', asyncHandler((req: Request, res: Response) => taskController.getTaskById(req, res)));

// Ruta para actualizar una tarea por ID
router.put('/tasks/:id', asyncHandler((req: Request, res: Response) => taskController.updateTask(req, res)));

// Ruta para eliminar una tarea por ID
router.delete('/tasks/:id', asyncHandler((req: Request, res: Response) => taskController.deleteTask(req, res)));

export default router;
