import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { CreateTodoRequest, UpdateTodoRequest } from "../types/todo.types";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  /**
   * Get all todos
   */
  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("📋 Fetching all todos for user...", req);
      const userId = (req as any).user?.userId;
      console.log("for user:", userId);

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "User authentication required",
        });
        return;
      }

      const todos = await this.todoService.getAllTodos(userId);

      res.status(200).json({
        success: true,
        data: todos,
        message: `Retrieved ${todos.length} todos`,
      });
    } catch (error: any) {
      console.error("❌ TodoController: Error fetching todos:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch todos",
        message: error.message,
      });
    }
  };

  /**
   * Get a single todo by ID
   */
  getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoId = parseInt(req.params.id);
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "User authentication required",
        });
        return;
      }

      if (isNaN(todoId)) {
        res.status(400).json({
          success: false,
          error: "Invalid todo ID",
        });
        return;
      }

      const todo = await this.todoService.getTodoById(todoId, userId);

      if (!todo) {
        res.status(404).json({
          success: false,
          error: "Todo not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: todo,
      });
    } catch (error: any) {
      console.error("❌ TodoController: Error fetching todo:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch todo",
        message: error.message,
      });
    }
  };

  /**
   * Create a new todo
   */
  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, completed }: CreateTodoRequest = req.body;
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "User authentication required",
        });
        return;
      }

      if (!title || title.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: "Title is required and cannot be empty",
        });
        return;
      }

      const newTodo = await this.todoService.createTodo({
        title: title.trim(),
        completed,
        userId,
      });

      res.status(201).json({
        success: true,
        data: newTodo,
        message: "Todo created successfully",
      });
    } catch (error: any) {
      console.error("❌ TodoController: Error creating todo:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create todo",
        message: error.message,
      });
    }
  };

  /**
   * Update an existing todo
   */
  updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoId = parseInt(req.params.id);
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "User authentication required",
        });
        return;
      }

      if (isNaN(todoId)) {
        res.status(400).json({
          success: false,
          error: "Invalid todo ID",
        });
        return;
      }

      const { title, completed }: UpdateTodoRequest = req.body;

      // Check if at least one field is provided
      if (title === undefined && completed === undefined) {
        res.status(400).json({
          success: false,
          error: "At least one field (title or completed) must be provided",
        });
        return;
      }

      // Validate title if provided
      if (title !== undefined && title.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: "Title cannot be empty",
        });
        return;
      }

      const updateData: UpdateTodoRequest = {};
      if (title !== undefined) updateData.title = title.trim();
      if (completed !== undefined) updateData.completed = completed;

      const updatedTodo = await this.todoService.updateTodo(
        todoId,
        userId,
        updateData
      );

      res.status(200).json({
        success: true,
        data: updatedTodo,
        message: "Todo updated successfully",
      });
    } catch (error: any) {
      console.error("❌ TodoController: Error updating todo:", error);

      if (error.code === "P2025") {
        res.status(404).json({
          success: false,
          error: "Todo not found",
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: "Failed to update todo",
        message: error.message,
      });
    }
  };

  /**
   * Delete a todo
   */
  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoId = parseInt(req.params.id);
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "User authentication required",
        });
        return;
      }

      if (isNaN(todoId)) {
        res.status(400).json({
          success: false,
          error: "Invalid todo ID",
        });
        return;
      }

      await this.todoService.deleteTodo(todoId, userId);

      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
      });
    } catch (error: any) {
      console.error("❌ TodoController: Error deleting todo:", error);

      if (error.code === "P2025") {
        res.status(404).json({
          success: false,
          error: "Todo not found",
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: "Failed to delete todo",
        message: error.message,
      });
    }
  };

  /**
   * Toggle todo completion status
   */
  toggleComplete = async (req: Request, res: Response): Promise<void> => {
    try {
      const todoId = parseInt(req.params.id);
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
        return;
      }

      const updatedTodo = await this.todoService.toggleComplete(todoId, userId);

      res.status(200).json({
        success: true,
        data: updatedTodo,
        message: `Todo marked as ${
          updatedTodo.completed ? "complete" : "incomplete"
        }`,
      });
    } catch (error: any) {
      console.error(
        "❌ TodoController: Error toggling todo completion:",
        error
      );

      if (error.message === "Todo not found" || error.code === "P2025") {
        res.status(404).json({
          success: false,
          error: "Todo not found",
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: "Failed to toggle todo completion",
        message: error.message,
      });
    }
  };
}
