import { Request, Response } from 'express';
import { TaskService } from './../services/task.service';
import { Task } from './../models/task.model';

export class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response): Promise<Response> {
    const taskData: Partial<Task> = req.body;
    try {
      const task = await this.taskService.createTask(taskData);
      return res.status(201).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la tarea.' });
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await this.taskService.getAllTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener las tareas.' });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const task = await this.taskService.getTaskById(Number(id));
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
      }
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener la tarea.' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const taskData: Partial<Task> = req.body;
    try {
      const updatedTask = await this.taskService.updateTask(Number(id), taskData);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Tarea no encontrada para actualizar.' });
      }
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al actualizar la tarea.' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await this.taskService.deleteTask(Number(id));
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar la tarea.' });
    }
  }
}
