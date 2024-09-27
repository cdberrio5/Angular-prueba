import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  deadline!: Date;

  @ManyToMany(() => User)
  @JoinTable()
  associatedUsers!: User[];
}
