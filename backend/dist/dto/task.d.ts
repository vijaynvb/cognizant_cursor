import type { Pagination } from './common';
/** Task status enum. */
export type TaskStatus = 'todo' | 'inProgress' | 'blocked' | 'completed';
/** Task priority enum. */
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
/** Task entity. */
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
/** Create task request. */
export interface CreateTaskRequest {
    title: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: string;
    assigneeId?: string;
    tags?: string[];
}
/** Update task request (full update). */
export type UpdateTaskRequest = CreateTaskRequest;
/** Patch task request (partial update). */
export interface PatchTaskRequest {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: string;
    assigneeId?: string;
    tags?: string[];
}
/** Paginated task list response. */
export interface TaskListResponse {
    data: Task[];
    pagination: Pagination;
}
//# sourceMappingURL=task.d.ts.map