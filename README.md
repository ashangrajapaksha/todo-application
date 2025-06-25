# Todo Backend API

A well-structured Node.js backend API for managing todos, built with Express.js, TypeScript, and Prisma ORM.

## 🏗️ Project Structure

```
src/
├── controllers/         # Request handlers and business logic coordination
│   ├── auth.controller.ts
│   └── todo.controller.ts
├── services/           # Business logic and data operations
│   ├── auth.service.ts
│   └── todo.service.ts
├── middleware/         # Custom middleware functions
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   └── validation.middleware.ts
├── routes/            # Route definitions
│   ├── auth.routes.ts
│   └── todo.routes.ts
├── types/             # TypeScript type definitions
│   ├── auth.types.ts
│   └── todo.types.ts
├── utils/             # Utility functions and helpers
│   ├── auth.utils.ts
│   └── helpers.ts
├── prisma.ts          # Prisma client configuration
└── server.ts          # Express server setup
```

## 🚀 Features

- **JWT Authentication**: User signup, signin, and protected routes
- **Modular Architecture**: Clean separation of concerns with controllers, services, and middleware
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Type-safe database operations with MySQL
- **Validation**: Input validation middleware for all endpoints
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Request/response logging middleware
- **CORS**: Cross-origin resource sharing enabled

## ️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM and database toolkit
- **MySQL** - Database
- **CORS** - Cross-origin resource sharing

## 🏃‍♂️ Running the Application

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Add your database URL and JWT secret:
   # DATABASE_URL="your-database-connection-string"
   # JWT_SECRET="your-jwt-secret-key"
   ```

3. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Server will be running at:**
   - `http://localhost:3000`

## 📝 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error description",
  "message": "Additional error details"
}
```

## 🔧 Development

- **Build:** `npm run build`
- **Start production:** `npm start`
- **Database Studio:** `npx prisma studio`
- **Reset database:** `npx prisma migrate reset`

## 📁 Architecture Benefits

1. **Separation of Concerns**: Controllers handle HTTP, services handle business logic
2. **Reusability**: Services can be used across different controllers
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Clear structure makes code easy to understand and modify
5. **Scalability**: Easy to add new features and endpoints
6. **Type Safety**: TypeScript ensures compile-time error checking
