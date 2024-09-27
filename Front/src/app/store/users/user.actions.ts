import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[User] Load Users');

export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);

export const addSkill = createAction(
  '[User] Add Skill',
  props<{ userId: number, skill: string }>()
);

export const removeSkill = createAction(
  '[User] Remove Skill',
  props<{ userId: number, skillIndex: number }>()
);

export const loadUsersSuccess = createAction(
    '[User] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: string }>()
);

export const addUserSuccess = createAction(
    '[User] Add User Success',
    props<{ user: User }>()
);

export const addUserFailure = createAction(
    '[User] Add User Failure',
    props<{ error: string }>()
);

export const updateUserSuccess = createAction(
    '[User] Update User Success',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[User] Update User Failure',
    props<{ error: string }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ id: number }>()
);

export const deleteUserFailure = createAction(
    '[User] Delete User Failure',
    props<{ error: string }>()
);
