import { createConnection } from 'typeorm';

export const connectDatabase = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      synchronize: true,
      logging: false,
      entities: [
        __dirname + '/models/*.ts',
      ],
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
