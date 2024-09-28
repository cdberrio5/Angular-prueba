import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TaskService } from './../../core/services/task.service';
import { Task } from './../../models/task.model';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(() => this.taskService.getTasks().pipe(
      map((tasks: Task[]) => TaskActions.loadTasksSuccess({ tasks })),
      catchError(error => of(TaskActions.loadTasksFailure({ error }))) // Maneja errores
    ))
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    mergeMap(action => this.taskService.addTask(action.task).pipe(
      map(task => TaskActions.addTaskSuccess({ task })),
      catchError(error => of(TaskActions.addTaskFailure({ error }))) // Maneja errores
    ))
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTask),
    mergeMap(action => this.taskService.updateTask(action.task).pipe(
      map(task => TaskActions.updateTaskSuccess({ task })),
      catchError(error => of(TaskActions.updateTaskFailure({ error }))) // Maneja errores
    ))
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(action => this.taskService.deleteTask(action.taskId).pipe(
      map(() => TaskActions.deleteTaskSuccess({ taskId: action.taskId })),
      catchError(error => of(TaskActions.deleteTaskFailure({ error }))) // Maneja errores
    ))
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }
}
