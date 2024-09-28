import app from './app'; // Import the Express app instance from the app module
import { connectDatabase } from './config/database'; // Import the function to connect to the database

// Set the port for the server to listen on, defaulting to 3000 if not specified in the environment variables
const PORT = process.env.PORT || 3000;

// Define an asynchronous function to start the server
const startServer = async () => {
  try {
    // Attempt to connect to the database using the imported connectDatabase function
    await connectDatabase();

    // Start the Express app on the specified port
    app.listen(PORT, () => {
      // Log a message to the console indicating that the server is running
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // If there's an error during the connection or server start, log the error message
    console.error('Error starting the server:', error);
    // Exit the process with a failure code
    process.exit(1);
  }
};

// Call the function to start the server
startServer();
