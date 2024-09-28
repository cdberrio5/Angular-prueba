import { AppDataSource } from './../config/database'; // Import the data source configuration for database connection
import { User } from './../models/user.model'; // Import the User model representing user entities in the database

export class UserService {
    // Create a repository for the User model to perform database operations
    private userRepository = AppDataSource.getRepository(User);

    // Method to create a new user in the database
    public async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user); // Save the user entity to the database and return it
    }

    // Method to retrieve all users from the database
    public async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find({ order: { id: 'DESC' } }); // Fetch all users ordered by id in descending order
    }

    // Method to retrieve a user by their ID
    public async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ // Find a user by ID
            where: { id },
        });
        return user; // Return the user if found, or null if not
    }

    // Method to update an existing user
    public async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        const existingUser = await this.getUserById(id); // Fetch the user by ID
        if (!existingUser) {
            return null; // If the user does not exist, return null
        }

        await this.userRepository.update(id, userData); // Update the user data in the repository

        return await this.getUserById(id); // Return the updated user
    }

    // Method to delete a user by ID
    public async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id); // Delete the user and get the result
        return result.affected !== 0; // Return true if a user was deleted, false otherwise
    }
}
