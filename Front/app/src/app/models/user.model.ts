/**
 * User interface represents the structure of a user object in the application.
 * It defines the properties that describe each user.
 */
export interface User {
    /**
     * A unique identifier for the user.
     * This field is optional and can be null when the user is not yet created or saved.
     */
    id?: number | null;
  
    /**
     * The full name of the user, typically including both first and last names.
     */
    fullName: string;
  
    /**
     * The age of the user.
     * It is represented as a number, typically an integer.
     */
    age: number;
  
    /**
     * An array of skills that the user possesses.
     * Each skill is represented as a string.
     */
    skills: string[];
  }
  