import { createAction, props } from '@ngrx/store'; // Import functions for creating actions and defining their properties.
import { User } from './../../models/user.model'; // Import the User model to define the shape of user data.

// Action to load users from a data source.
export const loadUsers = createAction('[User] Load Users');

// Action to add a new user, expecting a User object as payload.
export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>() // Use props to specify that this action carries a 'user' payload of type User.
);

// Action to update an existing user, also carrying a User object as payload.
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>() // Specify that the action includes the updated User object.
);

// Action to delete a user by their unique ID.
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>() // This action carries the ID of the user to be deleted.
);

// Action to add a skill to a user, carrying the user's ID and the skill as payload.
export const addSkill = createAction(
  '[User] Add Skill',
  props<{ userId: number, skill: string }>() // Specifies userId and skill as properties for this action.
);

// Action to remove a skill from a user by their ID and the index of the skill in the array.
export const removeSkill = createAction(
  '[User] Remove Skill',
  props<{ userId: number, skillIndex: number }>() // Specifies userId and the index of the skill to remove.
);

// Action indicating that loading users was successful, carrying the loaded users as payload.
export const loadUsersSuccess = createAction(
    '[User] Load Users Success',
    props<{ users: User[] }>() // This action includes an array of User objects that were loaded successfully.
);

// Action indicating that loading users failed, carrying an error message as payload.
export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: string }>() // Includes an error message that describes the failure.
);

// Action indicating that adding a user was successful, carrying the added user as payload.
export const addUserSuccess = createAction(
    '[User] Add User Success',
    props<{ user: User }>() // This action includes the User object that was successfully added.
);

// Action indicating that adding a user failed, carrying an error message as payload.
export const addUserFailure = createAction(
    '[User] Add User Failure',
    props<{ error: string }>() // Includes an error message that describes the failure to add a user.
);

// Action indicating that updating a user was successful, carrying the updated user as payload.
export const updateUserSuccess = createAction(
    '[User] Update User Success',
    props<{ user: User }>() // This action includes the updated User object.
);

// Action indicating that updating a user failed, carrying an error message as payload.
export const updateUserFailure = createAction(
    '[User] Update User Failure',
    props<{ error: string }>() // Includes an error message that describes the failure to update a user.
);
