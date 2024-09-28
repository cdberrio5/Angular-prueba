import { createSelector, createFeatureSelector } from '@ngrx/store'; // Import NgRx functions for creating selectors.
import { UserState } from './user.state'; // Import the UserState interface.

export const selectUsersState = createFeatureSelector<UserState>('users');
// Create a feature selector to access the UserState from the store.

export const selectAllUsers = createSelector(
  selectUsersState, // Select the UserState from the store.
  (state: UserState) => state.users // Return the list of users from the state.
);

// Create a selector to retrieve a specific user by their ID.
export const selectUserById = (userId: number) => createSelector(
  selectAllUsers, // Use the selector for all users as a base.
  users => users.find(user => user.id === userId) // Find and return the user with the specified ID.
);
