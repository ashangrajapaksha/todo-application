import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { SignupRequest, SigninRequest } from "../types/auth.types";
import { generateToken } from "../utils/auth.utils";
import {
  isValidEmail,
  isValidMobile,
  isValidPassword,
} from "../utils/auth.utils";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * User signup
   */
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, lastName, email, mobile, password }: SignupRequest =
        req.body;

      // Validation
      if (!firstName || !lastName || !email || !mobile || !password) {
        res.status(400).json({
          success: false,
          error: "All fields are required",
          message:
            "firstName, lastName, email, mobile, and password are required",
        });
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
        return;
      }

      // Validate mobile format
      if (!isValidMobile(mobile)) {
        res.status(400).json({
          success: false,
          error: "Invalid mobile number format",
        });
        return;
      }

      // Validate password strength
      const passwordValidation = isValidPassword(password);
      if (!passwordValidation.isValid) {
        res.status(400).json({
          success: false,
          error: "Invalid password",
          message: passwordValidation.message,
        });
        return;
      }

      // Check if user already exists
      const existingUser = await this.authService.userExists(email, mobile);
      if (existingUser.email) {
        res.status(409).json({
          success: false,
          error: "User already exists",
          message: "Email is already registered",
        });
        return;
      }

      if (existingUser.mobile) {
        res.status(409).json({
          success: false,
          error: "User already exists",
          message: "Mobile number is already registered",
        });
        return;
      }

      // Create user
      const user = await this.authService.signup({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        mobile: mobile.trim(),
        password,
      });

      // Generate JWT token
      const token = generateToken({ userId: user.id, email: user.email });

      res.status(201).json({
        success: true,
        user,
        token,
        message: "User registered successfully",
      });
    } catch (error: any) {
      console.error("❌ AuthController: Error during signup:", error);
      res.status(500).json({
        success: false,
        error: "Registration failed",
        message: error.message,
      });
    }
  };

  /**
   * User signin
   */
  signin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: SigninRequest = req.body;

      // Validation
      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: "Email and password are required",
        });
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
        return;
      }

      // Authenticate user
      const user = await this.authService.signin({
        email: email.toLowerCase().trim(),
        password,
      });

      if (!user) {
        res.status(401).json({
          success: false,
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
        return;
      }

      // Generate JWT token
      const token = generateToken({ userId: user.id, email: user.email });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        user: userWithoutPassword,
        token,
        message: "Login successful",
      });
    } catch (error: any) {
      console.error("❌ AuthController: Error during signin:", error);
      res.status(500).json({
        success: false,
        error: "Login failed",
        message: error.message,
      });
    }
  };

  /**
   * Get current user profile
   */
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      // This will be populated by auth middleware
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
        return;
      }

      const user = await this.authService.findUserById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          error: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user,
        message: "Profile retrieved successfully",
      });
    } catch (error: any) {
      console.error("❌ AuthController: Error getting profile:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get profile",
        message: error.message,
      });
    }
  };
}
