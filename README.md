# Todo Backend API

A well-structured Node.js backend API for managing todos, built with Express.js, TypeScript, and Prisma ORM.

## ‍♂️ Getting Started on New Laptop

### Prerequisites

Before setting up this project, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Database** - MySQL/PostgreSQL installed locally or use a cloud database service

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd todo-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```env
   # Database connection string
   DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
   # or for PostgreSQL:
   # DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"

   # JWT secret (use a secure random string)
   JWT_SECRET="your-super-secure-jwt-secret-key"
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

6. **Start development server:**

   ```bash
   npm run dev
   ```

7. **Verify setup:**
   - Server should start on `http://localhost:3000`
   - Visit `http://localhost:3000/health` to check if the server is running

### 🔧 Development Commands

- **Development mode:** `npm run dev`
- **Build project:** `npm run build`
- **Start production:** `npm start`
- **Database Studio:** `npx prisma studio`
- **Reset database:** `npx prisma migrate reset`

### 🚨 Common Issues & Solutions

**Database Connection Error:**

- Check your `DATABASE_URL` in `.env` file
- Ensure your database server is running
- Verify database credentials and database name exists

**JWT Authentication Error:**

- Make sure `JWT_SECRET` is set in `.env` file
- Use a secure, random string for JWT_SECRET

**Port Already in Use:**

- Change the port in your server configuration
- Or kill the process using port 3000: `lsof -ti:3000 | xargs kill`

**Migration Errors:**

- Reset database: `npx prisma migrate reset`
- Then run: `npx prisma migrate dev`

**Missing Dependencies:**

- Delete `node_modules` and `package-lock.json`
- Run: `npm install`
