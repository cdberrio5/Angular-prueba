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
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await AppDataSource.initialize();
      console.log("Conexión a la base de datos establecida correctamente.");
      return;
    } catch (error) {
      retries++;
      console.error(`Error al conectar a la base de datos (intento ${retries} de ${maxRetries}):`, error);

      if (retries < maxRetries) {
        console.log(`Reintentando conexión en 10 segundos...`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } else {
        console.error("Se han agotado los intentos de conexión. Cerrando el proceso.");
        process.exit(1);
      }
    }
  }
};