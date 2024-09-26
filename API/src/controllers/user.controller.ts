import { Request, Response } from 'express';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { fullName, age, skills, isActive } = req.body;

    if (!fullName || typeof age !== 'number') {
      return res.status(400).json({ error: 'Datos inválidos. Asegúrese de proporcionar un nombre completo y una edad válida.' });
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
      return res.status(500).json({ error: 'Error al crear el usuario. Inténtalo de nuevo más tarde.' });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener usuarios. Inténtalo de nuevo más tarde.' });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const user = await this.userService.getUserById(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el usuario. Inténtalo de nuevo más tarde.' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fullName, age, skills, isActive } = req.body;

    try {
        const updatedUser = await this.userService.updateUser(Number(id), { fullName, age, skills, isActive });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado para actualizar.' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el usuario. Inténtalo de nuevo más tarde.' });
    }
}

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deleted = await this.userService.deleteUser(Number(id));
      if (!deleted) {
        return res.status(404).json({ error: 'Usuario no encontrado para eliminar.' });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el usuario. Inténtalo de nuevo más tarde.' });
    }
  }
}
