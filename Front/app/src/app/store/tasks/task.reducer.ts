import { createReducer, on } from '@ngrx/store';
import { TaskState, initialTaskState } from './task.state';
import { 
  addTaskFailure, 
  addTaskSuccess, 
  deleteTaskFailure, 
  deleteTaskSuccess, 
  loadTasksFailure, 
  loadTasksSuccess, 
  updateTask, 
  updateTaskFailure, 
  updateTaskSuccess 
} from './task.actions';

export const taskReducer = createReducer(
  initialTaskState,
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks
  })),

  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),

  on(addTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Cambiar esta parte
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)) // Reemplaza la tarea existente
  })),

  // También cambiar updateTaskSuccess
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)) // Reemplaza la tarea existente
  })),

  on(updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(p => p.id !== taskId),
  })),

  on(deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
