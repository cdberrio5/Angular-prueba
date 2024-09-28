// Importing the TaskState and UserState interfaces to define the overall application state.
import { TaskState } from './tasks/task.state'; // Task state structure for managing tasks.
import { UserState } from './users/user.state'; // User state structure for managing users.

// Define the overall application state interface.
export interface AppState {
  tasks: TaskState; // A property representing the state related to tasks.
  users: UserState; // A property representing the state related to users.
}
