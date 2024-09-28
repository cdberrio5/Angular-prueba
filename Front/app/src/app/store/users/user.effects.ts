import { Injectable } from '@angular/core'; // Import the Injectable decorator for Angular services.
import { Actions, createEffect, ofType } from '@ngrx/effects'; // Import NgRx classes for handling side effects.
import { of } from 'rxjs'; // Import 'of' to create an observable from values.
import { catchError, map, mergeMap } from 'rxjs/operators'; // Import RxJS operators for handling observables.
import { UserService } from './../../core/services/user.service'; // Import the UserService to handle API calls related to users.
import {
  addUser,
  addUserSuccess,
  addUserFailure,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure
} from './user.actions'; // Import user-related actions.
import { User } from './../../models/user.model'; // Import the User model to type user data.

@Injectable() // Mark the class as injectable for dependency injection.
export class UserEffects {
  constructor(
    private actions$: Actions, // Inject the Actions observable for listening to dispatched actions.
    private userService: UserService // Inject the UserService to perform user-related operations.
  ) {}

  // Effect to load users from the service.
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers), // Listen for the loadUsers action.
    mergeMap(() => this.userService.getUsers() // Call the service to get users.
      .pipe(
        map((users: User[]) => loadUsersSuccess({ users })), // On success, dispatch loadUsersSuccess with the users array.
        catchError(error => of(loadUsersFailure({ error }))) // On error, dispatch loadUsersFailure with the error.
      ))
  ));

  // Effect to add a user.
  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(addUser), // Listen for the addUser action.
    mergeMap(action => this.userService.addUser(action.user) // Call the service to add the user.
      .pipe(
        map(user => addUserSuccess({ user })), // On success, dispatch addUserSuccess with the added user.
        catchError(error => of(addUserFailure({ error }))) // On error, dispatch addUserFailure with the error.
      ))
  ));

  // Effect to update a user.
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser), // Listen for the updateUser action.
    mergeMap(action => this.userService.updateUser(action.user) // Call the service to update the user.
      .pipe(
        map(user => updateUserSuccess({ user })), // On success, dispatch updateUserSuccess with the updated user.
        catchError(error => of(updateUserFailure({ error }))) // On error, dispatch updateUserFailure with the error.
      ))
  ));
}
