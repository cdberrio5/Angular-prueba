import { Injectable } from '@angular/core'; // Import Injectable decorator for creating a service.
import { Actions, createEffect, ofType } from '@ngrx/effects'; // Import necessary functions from NgRx effects for handling side effects.
import { mergeMap, map, catchError } from 'rxjs/operators'; // Import RxJS operators for transforming and handling asynchronous data.
import { of } from 'rxjs'; // Import 'of' for creating observables from static values.

import { TaskService } from './../../core/services/task.service'; // Import the TaskService for making API calls.
import { Task } from './../../models/task.model'; // Import the Task model for type safety in effects.

import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  addTask,
  addTaskSuccess,
  addTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure
} from './task.actions'; // Import actions related to tasks.

@Injectable() // Mark this class as an injectable service.
export class TaskEffects {

  constructor(
    private actions$: Actions, // Inject the Actions observable to listen for dispatched actions.
    private taskService: TaskService // Inject the TaskService for API interactions.
  ) { }

  // Effect for loading tasks from the server
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks), // Listen for loadTasks action
    mergeMap(() => this.taskService.getTasks() // Call the getTasks method from the TaskService
      .pipe(
        map((tasks: Task[]) => loadTasksSuccess({ tasks })), // On success, dispatch loadTasksSuccess action with tasks
        catchError(error => of(loadTasksFailure({ error }))) // On error, dispatch loadTasksFailure action with error
      )
    )
  ));

  // Effect for adding a new task
  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(addTask), // Listen for addTask action
    mergeMap(action => 
      this.taskService.addTask(action.task).pipe( // Call the addTask method with the provided task
        map(task => addTaskSuccess({ task })), // On success, dispatch addTaskSuccess action with the added task
        catchError(error => of(addTaskFailure({ error }))) // On error, dispatch addTaskFailure action with error
      )
    )
  ));

  // Effect for updating an existing task
  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask), // Listen for updateTask action
    mergeMap(action => 
      this.taskService.updateTask(action.task).pipe( // Call the updateTask method with the provided task
        map(task => updateTaskSuccess({ task })), // On success, dispatch updateTaskSuccess action with the updated task
        catchError(error => of(updateTaskFailure({ error }))) // On error, dispatch updateTaskFailure action with error
      )
    )
  ));
}
