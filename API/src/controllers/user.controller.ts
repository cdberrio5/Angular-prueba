import { Request, Response } from 'express';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';

// UserController handles HTTP requests related to user operations.
export class UserController {
  private userService: UserService;

  // Initializes the UserService.
  constructor() {
    this.userService = new UserService();
  }

  // Handles creating a new user.
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { fullName, age, skills, isActive } = req.body;

    // Validates request data.
    if (!fullName || typeof age !== 'number') {
      return res.status(400).json({ error: 'Invalid data. Ensure to provide a full name and a valid age.' });
    }

    const user = new User();
    user.fullName = fullName;
    user.age = age;
    user.skills = skills || [];
    user.isActive = isActive !== undefined ? isActive : true;

    try {
      const savedUser = await this.userService.createUser(user);
      return res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating user. Please try again later.' });
    }
  }

  // Handles retrieving all users.
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching users. Please try again later.' });
    }
  }

  // Handles retrieving a user by ID.
  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.userService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching user. Please try again later.' });
    }
  }

  // Handles updating a user by ID.
  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fullName, age, skills, isActive } = req.body;

    try {
      const updatedUser = await this.userService.updateUser(Number(id), { fullName, age, skills, isActive });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found for update.' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating user. Please try again later.' });
    }
  }

  // Handles deleting a user by ID.
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deleted = await this.userService.deleteUser(Number(id));
      if (!deleted) {
        return res.status(404).json({ error: 'User not found for deletion.' });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error deleting user. Please try again later.' });
    }
  }
}
