export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: UserResponse;
  token: string;
  message: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
}
