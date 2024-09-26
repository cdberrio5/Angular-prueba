import { Request, Response, Router } from 'express';
import { UserController } from './../controllers/user.controller';

const router = Router();
const userController = new UserController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/users', asyncHandler((req: Request, res: Response) => userController.createUser(req, res)));

router.get('/users', asyncHandler((req: Request, res: Response) => userController.getAllUsers(req, res)));

router.get('/users/:id', asyncHandler((req: Request, res: Response) => userController.getUserById(req, res)));

router.put('/users/:id', asyncHandler((req: Request, res: Response) => userController.updateUser(req, res)));

router.delete('/users/:id', asyncHandler((req: Request, res: Response) => userController.deleteUser(req, res)));

export default router;
