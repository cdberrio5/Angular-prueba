import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { mergeMap, map } from 'rxjs/operators';
import { TaskService } from './../../core/services/task.service';
import { Task } from './../../models/task.model';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(() => this.taskService.getTasks().pipe(
      map((tasks: Task[]) => TaskActions.loadTasksSuccess({ tasks }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }
}
