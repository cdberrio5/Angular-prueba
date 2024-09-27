import { TaskState } from './tasks/task.state';
import { UserState } from './users/user.state';

export interface AppState {
  tasks: TaskState;
  users: UserState;
}
