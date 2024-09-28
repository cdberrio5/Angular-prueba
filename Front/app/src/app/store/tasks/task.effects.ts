import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TaskService } from './../../core/services/task.service';
import { Task } from './../../models/task.model';

import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  addTask,
  addTaskSuccess,
  addTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
} from './task.actions';

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks),
    mergeMap(() => this.taskService.getTasks()
      .pipe(
        map((tasks: Task[]) => loadTasksSuccess({ tasks })),
        catchError(error => of(loadTasksFailure({ error })))
      )
    )
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(addTask),
    mergeMap(action => 
      this.taskService.addTask(action.task).pipe(
        map(task => addTaskSuccess({ task })),
        catchError(error => of(addTaskFailure({ error }))) // Manejo de errores
      )
    )
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    mergeMap(action => 
      this.taskService.updateTask(action.task).pipe(
        map(task => updateTaskSuccess({ task })),
        catchError(error => of(updateTaskFailure({ error }))) // Manejo de errores
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTask),
    mergeMap(action => 
      this.taskService.deleteTask(action.taskId).pipe(
        map(() => deleteTaskSuccess({ taskId: action.taskId })),
        catchError(error => of(deleteTaskFailure({ error }))) // Manejo de errores
      )
    )
  ));
}
