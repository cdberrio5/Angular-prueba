import { Request, Response } from 'express';
import { TaskService } from './../services/task.service';
import { Task } from './../models/task.model';

// TaskController handles HTTP requests related to task operations.
export class TaskController {
  private taskService: TaskService;
  
  // Initializes the TaskService.
  constructor() { 
    this.taskService = new TaskService();
  }

  // Handles creating a new task.
  public async createTask(req: Request, res: Response): Promise<Response> {
    const taskData: Partial<Task> = req.body;
    try {
      const task = await this.taskService.createTask(taskData);
      return res.status(201).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating the task.' });
    }
  }

  // Handles retrieving all tasks.
  public async getAllTasks(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await this.taskService.getAllTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving tasks.' });
    }
  }

  // Handles retrieving a task by ID.
  public async getTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const task = await this.taskService.getTaskById(Number(id));
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving the task.' });
    }
  }

  // Handles updating a task by ID.
  public async updateTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const taskData: Partial<Task> = req.body;
    try {
      const updatedTask = await this.taskService.updateTask(Number(id), taskData);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found for update.' });
      }
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating the task.' });
    }
  }

  // Handles deleting a task by ID.
  public async deleteTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await this.taskService.deleteTask(Number(id));
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error deleting the task.' });
    }
  }
}
