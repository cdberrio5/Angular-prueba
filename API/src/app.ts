import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.use(cors());

app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
