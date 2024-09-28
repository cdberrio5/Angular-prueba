import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./../models/user.model";
import { Task } from "./../models/task.model";
import dotenv from 'dotenv';

dotenv.config();

// Define the AppDataSource with MySQL configuration.
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

// Function to connect to the database with retry logic.
export const connectDatabase = async () => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Attempt to initialize the data source.
      await AppDataSource.initialize();
      console.log("Database connection established successfully.");
      return;
    } catch (error) {
      retries++;
      console.error(`Error connecting to the database (attempt ${retries} of ${maxRetries}):`, error);

      if (retries < maxRetries) {
        console.log(`Retrying connection in 10 seconds...`);
        // Wait for 10 seconds before retrying.
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } else {
        console.error("All connection attempts failed. Exiting the process.");
        // Exit the process if all retries fail.
        process.exit(1);
      }
    }
  }
};
