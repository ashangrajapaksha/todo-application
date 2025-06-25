import prisma from "../prisma";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "../types/todo.types";

export class TodoService {
  /**
   * Get all todos for a specific user
   */
  async getAllTodos(userId: number): Promise<Todo[]> {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return todos;
  }

  /**
   * Get a single todo by ID for a specific user
   */
  async getTodoById(id: number, userId: number): Promise<Todo | null> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    return todo;
  }

  /**
   * Create a new todo
   */
  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    const newTodo = await prisma.todo.create({
      data: {
        title: data.title,
        completed: data.completed ?? false,
        userId: data.userId,
      },
    });

    return newTodo;
  }

  /**
   * Update an existing todo
   */
  async updateTodo(
    id: number,
    userId: number,
    data: UpdateTodoRequest
  ): Promise<Todo> {
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
        userId,
      },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.completed !== undefined && { completed: data.completed }),
      },
    });

    return updatedTodo;
  }

  /**
   * Delete a todo
   */
  async deleteTodo(id: number, userId: number): Promise<void> {
    await prisma.todo.delete({
      where: {
        id,
        userId,
      },
    });
  }

  /**
   * Toggle todo completion status
   */
  async toggleComplete(id: number, userId: number): Promise<Todo> {
    const todo = await this.getTodoById(id, userId);
    if (!todo) {
      throw new Error("Todo not found");
    }

    return await prisma.todo.update({
      where: { id, userId },
      data: { completed: !todo.completed },
    });
  }
}
