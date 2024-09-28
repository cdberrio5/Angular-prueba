import { User } from '../../models/user.model'; // Import the User model from the specified path.

// Define the shape of the user-related state in the application.
export interface UserState {
  users: User[]; // An array of User objects.
  loading: boolean; // A flag to indicate whether data is being loaded.
  error: string | null; // An optional error message that can be null if no error exists.
}

// Define the initial state for the User feature.
export const initialState: UserState = {
  users: [], // Start with an empty array of users.
  loading: false, // Initially, loading is set to false as no data is being fetched.
  error: null // No error at the start, so set to null.
};
