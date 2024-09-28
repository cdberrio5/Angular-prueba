import { createAction, props } from '@ngrx/store'; // Import the createAction and props functions from NgRx store for defining actions.
import { Task } from './../../models/task.model'; // Import the Task model for type safety in actions.


// Action to load tasks from the server
export const loadTasks = createAction('[Task] Load Tasks');

// Action to indicate successful loading of tasks, carries the loaded tasks as payload
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>() // Define the payload structure using props
);

// Action to indicate a failure when loading tasks, carries error information
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>() // Define the error structure using props
);

// Action to add a new task, carries the task data as payload
export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>() // Define the payload structure using props
);

// Action to indicate successful addition of a task, carries the added task as payload
export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>() // Define the payload structure using props
);

// Action to indicate a failure when adding a task, carries error information
export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ error: any }>() // Define the error structure using props
);

// Action to update an existing task, carries the updated task data as payload
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>() // Define the payload structure using props
);

// Action to indicate successful updating of a task, carries the updated task as payload
export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>() // Define the payload structure using props
);

// Action to indicate a failure when updating a task, carries error information
export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: any }>() // Define the error structure using props
);

// Action to update a list of new tasks, carries the new tasks as payload
export const updateNewTasks = createAction(
  '[Tasks] Update New Tasks', 
  props<{ tasks: Task[] }>() // Define the payload structure using props
);

// Action to update a list of pending tasks, carries the pending tasks as payload
export const updatePendingTasks = createAction(
  '[Tasks] Update Pending Tasks', 
  props<{ tasks: Task[] }>() // Define the payload structure using props
);

// Action to update a list of completed tasks, carries the completed tasks as payload
export const updateCompletedTasks = createAction(
  '[Tasks] Update Completed Tasks', 
  props<{ tasks: Task[] }>() // Define the payload structure using props
);

// Action to add an assigned user to a task, carries task ID and user ID as payload
export const addAssignedUser = createAction(
  '[Task] Add Assigned User',
  props<{ taskId: string; userId: string }>() // Define the payload structure using props
);

// Action to remove an assigned user from a task, carries task ID and user ID as payload
export const removeAssignedUser = createAction(
  '[Task] Remove Assigned User',
  props<{ taskId: string; userId: string }>() // Define the payload structure using props
);
