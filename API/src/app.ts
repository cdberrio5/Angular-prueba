import express, { Application } from 'express'; // Import Express and its types
import userRoutes from './routes/user.routes'; // Import user routes from a separate module
import taskRoutes from './routes/task.router'; // Import task routes from a separate module
import errorHandler from './middlewares/errorHandler'; // Import custom error handling middleware
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import cors from 'cors'; // Import CORS middleware for handling cross-origin requests

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of an Express application
const app: Application = express();

// Define allowed origins for CORS
const allowedOrigins = ['http://localhost:4200'];

// Set CORS options, specifying the allowed origins
const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

// Use CORS middleware with the defined options
app.use(cors(options));

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS for all routes (this line is redundant since CORS is already configured above)
app.use(cors());

// Mount user routes on the '/api' endpoint
app.use('/api', userRoutes);

// Mount task routes on the '/api' endpoint
app.use('/api', taskRoutes);

// Use custom error handling middleware for handling errors in the application
app.use(errorHandler);

// Export the configured Express application instance
export default app;
