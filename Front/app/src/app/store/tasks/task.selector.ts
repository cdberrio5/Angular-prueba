import { createFeatureSelector, createSelector } from '@ngrx/store'; // Import necessary functions for creating selectors from NgRx store.
import { TaskState } from './task.state'; // Import the TaskState interface/type to define the shape of the state.
import { Task } from './../../models/task.model'; // Import the Task model for type annotations.

export const selectTaskState = createFeatureSelector<TaskState>('tasks'); // Create a feature selector for the 'tasks' slice of state.

export const selectNewTasks = createSelector(
  selectTaskState, // Use the task state selector
  (state: TaskState) => state.tasks.filter(task => task.status === 1) // Filter tasks with status 1, indicating they are new tasks.
);

export const selectPendingTasks = createSelector(
  selectTaskState, // Use the task state selector
  (state: TaskState) => state.tasks.filter(task => task.status === 2) // Filter tasks with status 2, indicating they are pending tasks.
);

export const selectCompletedTasks = createSelector(
  selectTaskState, // Use the task state selector
  (state: TaskState) => state.tasks.filter(task => task.status === 3) // Filter tasks with status 3, indicating they are completed tasks.
);

export const selectDeletedTasks = createSelector(
  selectTaskState, // Use the task state selector
  (state: TaskState) => state.tasks.filter(task => task.status === 4) // Filter tasks with status 4, indicating they are deleted tasks.
);

export const selectTaskById = (taskId: number | null) => createSelector(
  selectTaskState, // Use the task state selector
  (state: TaskState) => state.tasks.find(task => task.id === taskId) // Find and return a task by its ID.
);
