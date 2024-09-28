import { Request, Response, Router } from 'express'; // Importing necessary types from Express
import { UserController } from './../controllers/user.controller'; // Importing the UserController class

const router = Router(); // Creating an instance of Router
const userController = new UserController(); // Creating an instance of UserController

// Async handler to catch errors in async route handlers
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Route to create a new user
router.post('/users', asyncHandler((req: Request, res: Response) => userController.createUser(req, res)));

// Route to get all users
router.get('/users', asyncHandler((req: Request, res: Response) => userController.getAllUsers(req, res)));

// Route to get a user by ID
router.get('/users/:id', asyncHandler((req: Request, res: Response) => userController.getUserById(req, res)));

// Route to update a user by ID
router.put('/users/:id', asyncHandler((req: Request, res: Response) => userController.updateUser(req, res)));

// Route to delete a user by ID
router.delete('/users/:id', asyncHandler((req: Request, res: Response) => userController.deleteUser(req, res)));

// Exporting the router to use in the main application
export default router;
