import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../models/*.ts'], // Asegúrate de usar la ruta correcta
      synchronize: true,
    });
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1); // Salir del proceso si falla la conexión
  }
};
