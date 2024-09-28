import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

// The User entity represents a user in the application.
@Entity()
export class User {
  // Primary key column that auto-generates unique IDs for each user.
  @PrimaryGeneratedColumn()
  id!: number;

  // Column to store the full name of the user.
  @Column()
  fullName!: string;

  // Column to store the age of the user.
  @Column()
  age!: number;

  // Column to store an array of skills as a simple array.
  @Column("simple-array")
  skills!: string[];

  // Column to store the active status of the user. Defaults to true.
  @Column({ default: true })
  isActive!: boolean;

  // Column to store the date and time when the user was created.
  @CreateDateColumn()
  createdAt!: Date;

  // Column to store the date and time when the user was deleted. This column is nullable.
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // Column to store the date and time when the user was last updated.
  @UpdateDateColumn()
  updatedAt!: Date;
}
