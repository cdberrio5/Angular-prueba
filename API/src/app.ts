import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/errorHandler';
import { connectDatabase } from './config/database';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app: Application = express();

// Middleware para analizar JSON
app.use(express.json());

// Configurar las rutas
app.use('/api', userRoutes);

// Manejo global de errores
app.use(errorHandler);

// Conectar a la base de datos
connectDatabase();

export default app;
