export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  completed?: boolean;
  userId: number;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface TodoResponse {
  success: boolean;
  data?: Todo | Todo[];
  message?: string;
  error?: string;
}
