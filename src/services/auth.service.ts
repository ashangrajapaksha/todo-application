import prisma from "../prisma";
import {
  User,
  UserResponse,
  SignupRequest,
  SigninRequest,
} from "../types/auth.types";
import { hashPassword, comparePassword } from "../utils/auth.utils";

export class AuthService {
  /**
   * Register a new user
   */
  async signup(data: SignupRequest): Promise<UserResponse> {
    // Hash the password
    const hashedPassword = await hashPassword(data.password);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        password: hashedPassword,
      },
    });

    // Return user without password
    return this.excludePassword(user);
  }

  /**
   * Authenticate user login
   */
  async signin(data: SigninRequest): Promise<User | null> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return null;
    }

    // Verify password
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Find user by mobile
   */
  async findUserByMobile(mobile: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { mobile },
    });
  }

  /**
   * Find user by ID
   */
  async findUserById(id: number): Promise<UserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.excludePassword(user);
  }

  /**
   * Check if user exists by email or mobile
   */
  async userExists(
    email: string,
    mobile: string
  ): Promise<{ email: boolean; mobile: boolean }> {
    const [emailExists, mobileExists] = await Promise.all([
      this.findUserByEmail(email),
      this.findUserByMobile(mobile),
    ]);

    return {
      email: !!emailExists,
      mobile: !!mobileExists,
    };
  }

  /**
   * Helper to exclude password from user object
   */
  private excludePassword(user: User): UserResponse {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
