import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth.utils";

// Extend the Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Access token required",
        message: "Please provide a valid authentication token",
      });
      return;
    }

    // Verify token
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    console.error("❌ Auth Middleware: Token verification failed:", error);

    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        error: "Token expired",
        message: "Your session has expired. Please login again.",
      });
      return;
    }

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        error: "Invalid token",
        message: "Please provide a valid authentication token",
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Authentication failed",
      message: "Unable to authenticate token",
    });
  }
};

/**
 * Optional authentication middleware - doesn't throw error if no token
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without setting user
    next();
  }
};
