import { AppDataSource } from './../config/database';
import { Task } from './../models/task.model';

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['assignedUsers'], order: { id: 'DESC' } });
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['assignedUsers'],
    });
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const { status, assignedUsers } = taskData;
  
    // Si existe assignedUsers, actualizamos solo el array de usuarios asignados
    if (assignedUsers) {
      if (!Array.isArray(assignedUsers)) {
        throw new Error("'assignedUsers' debe ser un array si se proporciona.");
      }
  
      // Primero obtenemos la tarea para actualizar su relación many-to-many
      const task = await this.getTaskById(id);
      if (!task) {
        throw new Error('La tarea no existe.');
      }
  
      // Actualiza la relación many-to-many de assignedUsers
      // En un framework ORM como TypeORM, se suele usar `set` o `save` para relaciones many-to-many
      task.assignedUsers = assignedUsers;
      await this.taskRepository.save(task);
    } 
    // Si no existe assignedUsers, actualizamos el status de la tarea
    else if (status !== undefined) {
      await this.taskRepository.update(id, taskData);
    } else {
      throw new Error("El campo 'status' es obligatorio cuando 'assignedUsers' no está presente.");
    }
  
    // Retorna la tarea actualizada
    return await this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
