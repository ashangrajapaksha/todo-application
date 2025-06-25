import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
} from "../middleware/validation.middleware";

const router = Router();
const todoController = new TodoController();

// All todo routes require authentication
router.use(authenticateToken);

// Basic CRUD Routes
router.get("/", todoController.getAllTodos);
router.get("/:id", validateTodoId, todoController.getTodoById);
router.post("/", validateCreateTodo, todoController.createTodo);
router.put(
  "/:id",
  validateTodoId,
  validateUpdateTodo,
  todoController.updateTodo
);
router.delete("/:id", validateTodoId, todoController.deleteTodo);

// State management endpoint
router.patch("/:id/toggle", validateTodoId, todoController.toggleComplete);

export default router;
