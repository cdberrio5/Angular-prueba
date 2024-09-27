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
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  // Efecto para cargar usuarios
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map((users: User[]) => loadUsersSuccess({ users })),  // Despachamos la acción con la lista de usuarios
        catchError(error => of(loadUsersFailure({ error })))  // Despachamos la acción de fallo con el error
      ))
  ));

  // Efecto para añadir un usuario
  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    mergeMap(action => this.userService.addUser(action.user)
      .pipe(
        map(user => addUserSuccess({ user })),  // Despachamos la acción de éxito con el usuario añadido
        catchError(error => of(addUserFailure({ error })))  // Despachamos la acción de fallo con el error
      ))
  ));

  // Efecto para actualizar un usuario
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    mergeMap(action => this.userService.updateUser(action.user)
      .pipe(
        map(user => updateUserSuccess({ user })),  // Despachamos la acción de éxito con el usuario actualizado
        catchError(error => of(updateUserFailure({ error })))  // Despachamos la acción de fallo con el error
      ))
  ));

  // Efecto para eliminar un usuario
  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    mergeMap(action => this.userService.deleteUser(action.id)
      .pipe(
        map(id => deleteUserSuccess({ id })),  // Despachamos la acción de éxito con el ID del usuario eliminado
        catchError(error => of(deleteUserFailure({ error })))  // Despachamos la acción de fallo con el error
      ))
  ));
}
