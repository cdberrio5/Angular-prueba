import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UserState) => state.users
);

export const selectUserById = (userId: number) => createSelector(
  selectAllUsers,
  users => users.find(user => user.id === userId)
);
