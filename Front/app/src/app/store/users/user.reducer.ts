import { createReducer, on } from '@ngrx/store';
import { UserState, initialState } from './user.state';
import {
  loadUsersSuccess, loadUsersFailure,
  addUserSuccess, addUserFailure,
  updateUserSuccess, updateUserFailure,
  deleteUserSuccess, deleteUserFailure
} from './user.actions';

export const userReducer = createReducer(
  initialState,
  
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false
  })),

  on(addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(p => p.id === user.id ? user : p),
    loading: false
  })),

  on(updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(p => p.id !== id),
    loading: false
  })),

  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
