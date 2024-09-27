import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
