import { Repository } from 'typeorm';
import { Task } from './../models/task.model'; // Ajusta la ruta según tu estructura
import { User } from './../models/user.model'; // Ajusta la ruta según tu estructura

export class TaskService {
  constructor(private taskRepository: Repository<Task>) {}

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['associatedUsers'] });
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['associatedUsers'],
    });
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
    await this.taskRepository.update(id, taskData);
    return await this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
