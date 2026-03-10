/** API types derived from OpenAPI spec */

export type TaskStatus = 'todo' | 'inProgress' | 'blocked' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type UserRole = 'user' | 'manager' | 'admin';

export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface UserSummary {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserSummary;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  assigneeId?: string;
  assigneeName?: string;
  tags: string[];
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  data: Task[];
  pagination: Pagination;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
  assigneeId?: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface CommentListResponse {
  data: Comment[];
  pagination: Pagination;
}

export interface UserListResponse {
  data: UserSummary[];
  pagination: Pagination;
}

export interface ApiError {
  code: string;
  message: string;
  timestamp: string;
  details?: Array<{ field?: string; message: string }>;
}
