import { User } from './user.model';  // Importing the User model, which represents a user object

/**
 * Task interface represents the structure of a task object in the application.
 * It is used to define the properties that each task will have.
 */
export interface Task {
  /**
   * A unique identifier for the task.
   * It can be null when the task is not yet created or saved.
   */
  id: number | null;

  /**
   * The title of the task, which provides a short description of the task's purpose.
   */
  title: string;

  /**
   * A detailed description of the task, explaining what needs to be done.
   */
  description: string;

  /**
   * The deadline for the task, specifying the date by which the task should be completed.
   */
  deadline: Date;

  /**
   * A flag indicating whether the task has been completed.
   * `true` means the task is completed, `false` means it is still pending.
   */
  isCompleted: boolean;

  /**
   * An array of users assigned to the task.
   * Each user is represented by the User interface, which defines user-related data.
   */
  assignedUsers: User[];

  /**
   * The status of the task, represented as a number.
   * This can be used to define different states of the task such as 'New', 'In Progress', 'Completed', etc.
   */
  status: number;
}
