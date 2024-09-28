import { Request, Response, NextFunction } from 'express';

// Error handler middleware function for handling errors in the application.
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error stack trace to the console for debugging purposes.
  console.error(err.stack);

  // Send a JSON response with the error status code and message.
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
