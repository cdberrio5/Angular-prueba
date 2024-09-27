import { User } from './user.model';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  assignedUsers: User[];
}
