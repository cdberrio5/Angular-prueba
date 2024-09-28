import { createReducer, on } from '@ngrx/store'; // Import createReducer and on functions from NgRx store.
import { initialTaskState } from './task.state'; // Import the initial state for tasks.
import { 
  addTaskFailure, 
  addTaskSuccess,
  loadTasksFailure, 
  loadTasksSuccess, 
  updateTask, 
  updateTaskFailure, 
  updateTaskSuccess 
} from './task.actions'; // Import task-related actions.

export const taskReducer = createReducer(
  initialTaskState, // Initialize the reducer with the initial state.
  
  // Handle the successful loading of tasks
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state, // Spread the current state
    tasks // Update the tasks array with the new tasks
  })),

  // Handle loading tasks failure
  on(loadTasksFailure, (state, { error }) => ({
    ...state, // Spread the current state
    loading: false, // Set loading to false
    error // Update the error with the received error
  })),

  // Handle successful addition of a new task
  on(addTaskSuccess, (state, { task }) => ({
    ...state, // Spread the current state
    tasks: [...state.tasks, task] // Add the new task to the existing tasks array
  })),

  // Handle addition of a task failure
  on(addTaskFailure, (state, { error }) => ({
    ...state, // Spread the current state
    loading: false, // Set loading to false
    error // Update the error with the received error
  })),

  // Handle task update request
  on(updateTask, (state, { task }) => ({
    ...state, // Spread the current state
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)) // Replace the existing task with the updated task
  })),

  // Handle successful task update
  on(updateTaskSuccess, (state, { task }) => ({
    ...state, // Spread the current state
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)) // Replace the existing task with the updated task
  })),

  // Handle update task failure
  on(updateTaskFailure, (state, { error }) => ({
    ...state, // Spread the current state
    loading: false, // Set loading to false
    error // Update the error with the received error
  })),
);
