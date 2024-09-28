import { Task } from './../../models/task.model'; // Import the Task model to define the shape of each task in the state.

// Define the interface for the TaskState, representing the structure of the state for tasks.
export interface TaskState {
  tasks: Task[]; // An array of Task objects that represents the list of tasks in the state.
}

// Define the initial state for tasks, which will be used to reset the state or set the default state.
export const initialTaskState: TaskState = {
  tasks: [] // Initialize the tasks array as empty, indicating no tasks are present at the start.
};
