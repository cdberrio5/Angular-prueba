import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.model';

// The Task entity represents a task in the application.
@Entity()
export class Task {
  // Primary key column that auto-generates unique IDs for each task.
  @PrimaryGeneratedColumn()
  id!: number;

  // Column to store the title of the task.
  @Column()
  title!: string;

  // Column to store the description of the task as text.
  @Column('text')
  description!: string;

  // Column to store the deadline of the task as a date.
  @Column()
  deadline!: Date;

  // Column to store the status of the task. Defaults to 1.
  @Column({ type: 'int', default: 1 })
  status!: number;

  // Many-to-Many relationship with the User entity.
  // This indicates that a task can be assigned to multiple users and a user can be assigned multiple tasks.
  // The @JoinTable decorator specifies that this side of the relationship owns the join table.
  @ManyToMany(() => User)
  @JoinTable()
  assignedUsers!: User[];
}
