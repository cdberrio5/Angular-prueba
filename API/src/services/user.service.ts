import { AppDataSource } from './../config/database';
import { User } from './../models/user.model';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    public async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find({ order: { id: 'DESC' } });
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        return user;
    }

    public async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        const existingUser = await this.getUserById(id);
        if (!existingUser) {
            return null;
        }

        await this.userRepository.update(id, userData);

        return await this.getUserById(id);
    }

    public async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected !== 0;
    }
}