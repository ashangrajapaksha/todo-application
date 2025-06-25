import { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("🔥 Global Error Handler:", err);

  // Default error
  let error = {
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  // Prisma errors
  if (err.code) {
    switch (err.code) {
      case "P2002":
        error.statusCode = 400;
        error.message = "Unique constraint violation";
        break;
      case "P2025":
        error.statusCode = 404;
        error.message = "Record not found";
        break;
      case "P2003":
        error.statusCode = 400;
        error.message = "Foreign key constraint violation";
        break;
      default:
        error.message = "Database error";
    }
  }

  // Validation errors
  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = err.message;
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * Handle 404 - Route not found
 */
export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};
