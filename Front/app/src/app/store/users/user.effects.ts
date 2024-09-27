import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from './../../core/services/user.service';
import {
  addUser, addUserSuccess, addUserFailure,
  loadUsers, loadUsersSuccess, loadUsersFailure,
  updateUser, updateUserSuccess, updateUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure
} from './user.actions';
import { User } from './../../models/user.model';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map((users: User[]) => loadUsersSuccess({ users })),
        catchError(error => of(loadUsersFailure({ error })))
      ))
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    mergeMap(action => this.userService.addUser(action.user)
      .pipe(
        map(user => addUserSuccess({ user })),
        catchError(error => of(addUserFailure({ error })))
      ))
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    mergeMap(action => this.userService.updateUser(action.user)
      .pipe(
        map(user => updateUserSuccess({ user })),
        catchError(error => of(updateUserFailure({ error })))
      ))
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    mergeMap(action => this.userService.deleteUser(action.id)
      .pipe(
        map(id => deleteUserSuccess({ id })),
        catchError(error => of(deleteUserFailure({ error })))
      ))
  ));
}
