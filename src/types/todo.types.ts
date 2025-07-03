export interface Todo {
  id: number;
  title: string;
  discription?: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  completed?: boolean;
  userId: number;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoResponse {
  success: boolean;
  data?: Todo | Todo[];
  message?: string;
  error?: string;
}
