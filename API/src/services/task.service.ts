import { AppDataSource } from './../config/database'; // Import the database configuration for database connection
import { Task } from './../models/task.model'; // Import the Task model representing task entities in the database

export class TaskService {
  // Create a repository for the Task model to perform database operations
  private taskRepository = AppDataSource.getRepository(Task);

  // Method to create a new task
  async createTask(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData); // Create a new task instance with the provided data
    return await this.taskRepository.save(task); // Save the task instance to the database and return it
  }

  // Method to retrieve all tasks from the database
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['assignedUsers'], order: { id: 'DESC' } }); // Fetch all tasks with their assigned users, ordered by id in descending order
  }

  // Method to retrieve a task by its ID
  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({ // Find a task by ID, including its assigned users
      where: { id },
      relations: ['assignedUsers'],
    });
  }

  // Method to update an existing task
  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const { status, assignedUsers } = taskData; // Destructure status and assignedUsers from the provided taskData
  
    if (!Array.isArray(assignedUsers)) {
      throw new Error("'assignedUsers' debe ser un array si se proporciona."); // Throw an error if assignedUsers is not an array
    }

    if (!status) {
      throw new Error("'assignedUsers' debe ser un array si se proporciona."); // Throw an error if status is undefined
    }

    // Fetch the existing task to update its many-to-many relationship
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('La tarea no existe.'); // Throw an error if the task does not exist
    }

    // Update the many-to-many relationship for assignedUsers
    task.assignedUsers = assignedUsers; // Set the new assigned users
    task.status = status;
    await this.taskRepository.save(task); // Save the updated task

    // Return the updated task
    return await this.getTaskById(id); // Fetch and return the updated task
  }

  // Method to delete a task by ID
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id); // Delete the task by its ID
  }
}
