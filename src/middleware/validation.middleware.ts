import { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate request data
 */
export const validateCreateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "Title is required",
    });
    return;
  }

  if (typeof title !== "string") {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "Title must be a string",
    });
    return;
  }

  if (title.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "Title cannot be empty",
    });
    return;
  }

  if (title.length > 255) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "Title cannot be longer than 255 characters",
    });
    return;
  }

  next();
};

/**
 * Middleware to validate update todo request
 */
export const validateUpdateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, completed } = req.body;

  // Check if at least one field is provided
  if (title === undefined && completed === undefined) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "At least one field (title or completed) must be provided",
    });
    return;
  }

  // Validate title if provided
  if (title !== undefined) {
    if (typeof title !== "string") {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        message: "Title must be a string",
      });
      return;
    }

    if (title.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        message: "Title cannot be empty",
      });
      return;
    }

    if (title.length > 255) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        message: "Title cannot be longer than 255 characters",
      });
      return;
    }
  }

  // Validate completed if provided
  if (completed !== undefined && typeof completed !== "boolean") {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "Completed must be a boolean",
    });
    return;
  }

  next();
};

/**
 * Middleware to validate todo ID parameter
 */
export const validateTodoId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const todoId = parseInt(id);

  if (isNaN(todoId) || todoId <= 0) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      message: "Invalid todo ID. ID must be a positive number",
    });
    return;
  }

  next();
};
