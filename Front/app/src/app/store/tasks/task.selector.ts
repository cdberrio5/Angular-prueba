import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';
import { Task } from './../../models/task.model';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectNewTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks.filter(task => task.status === 1) // Cambia según el valor que uses para nuevas tareas
);

export const selectPendingTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks.filter(task => task.status === 2) // Cambia según el valor que uses para tareas pendientes
);

export const selectCompletedTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks.filter(task => task.status === 3) // Cambia según el valor que uses para tareas completadas
);

export const selectDeletedTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks.filter(task => task.status === 4) // Cambia según el valor que uses para tareas completadas
);

export const selectTaskById = (taskId: number | null) => createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks.find(task => task.id === taskId)
);