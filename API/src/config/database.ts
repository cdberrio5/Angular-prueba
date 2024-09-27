import "reflect-metadata"; // Necesario para TypeORM
import { DataSource } from "typeorm";
import { User } from "./../models/user.model";
import { Task } from "./../models/task.model";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Task],
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};