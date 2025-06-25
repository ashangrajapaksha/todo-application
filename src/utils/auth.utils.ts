import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";

/**
 * Hash a password using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hashed password
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a JWT token
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload as any, JWT_SECRET, { expiresIn: "7d" });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate mobile phone format (basic validation)
 */
export const isValidMobile = (mobile: string): boolean => {
  const mobileRegex = /^[+]?[\d\s-()]{10,15}$/;
  return mobileRegex.test(mobile.replace(/\s/g, ""));
};

/**
 * Validate password strength
 */
export const isValidPassword = (
  password: string
): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (!/(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }

  return { isValid: true };
};
