import { createReducer, on } from '@ngrx/store'; // Import NgRx functions for creating reducers.
import { initialState } from './user.state'; // Import the initial state for the user feature.
import {
  loadUsersSuccess, loadUsersFailure,
  addUserSuccess, addUserFailure,
  updateUserSuccess, updateUserFailure
} from './user.actions'; // Import user-related actions.

export const userReducer = createReducer(
  initialState, // Initialize the reducer with the initial state.

  // Handle the success action for loading users.
  on(loadUsersSuccess, (state, { users }) => ({
    ...state, // Spread the current state.
    users, // Update the users array with the new users.
    loading: false // Set loading to false as the data has been successfully loaded.
  })),

  // Handle the failure action for loading users.
  on(loadUsersFailure, (state, { error }) => ({
    ...state, // Spread the current state.
    loading: false, // Set loading to false since the load failed.
    error // Store the error message in the state.
  })),

  // Handle the success action for adding a user.
  on(addUserSuccess, (state, { user }) => ({
    ...state, // Spread the current state.
    users: [...state.users, user], // Add the new user to the existing users array.
    loading: false // Set loading to false after the user has been added.
  })),

  // Handle the failure action for adding a user.
  on(addUserFailure, (state, { error }) => ({
    ...state, // Spread the current state.
    loading: false, // Set loading to false since the add operation failed.
    error // Store the error message in the state.
  })),

  // Handle the success action for updating a user.
  on(updateUserSuccess, (state, { user }) => ({
    ...state, // Spread the current state.
    users: state.users.map(p => p.id === user.id ? user : p), // Replace the updated user in the array.
    loading: false // Set loading to false after the user has been updated.
  })),

  // Handle the failure action for updating a user.
  on(updateUserFailure, (state, { error }) => ({
    ...state, // Spread the current state.
    loading: false, // Set loading to false since the update operation failed.
    error // Store the error message in the state.
  })),
);
