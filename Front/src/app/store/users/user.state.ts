import { User } from '../../models/user.model';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
    users: [],
  loading: false,
  error: null
};
