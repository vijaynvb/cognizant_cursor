import { apiClient } from './client';
import type {
  Task,
  TaskListResponse,
  CreateTaskRequest,
  UserListResponse,
} from '../types/api';

export interface TaskListParams {
  status?: string;
  priority?: string;
  assigneeId?: string;
  overdueOnly?: boolean;
  tag?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export const tasksApi = {
  list: async (params?: TaskListParams): Promise<TaskListResponse> => {
    const { data } = await apiClient.get<TaskListResponse>('/tasks', {
      params,
    });
    return data;
  },

  get: async (taskId: string): Promise<Task> => {
    const { data } = await apiClient.get<Task>(`/tasks/${taskId}`);
    return data;
  },

  create: async (body: CreateTaskRequest): Promise<Task> => {
    const { data } = await apiClient.post<Task>('/tasks', body);
    return data;
  },

  update: async (taskId: string, body: Partial<CreateTaskRequest>): Promise<Task> => {
    const { data } = await apiClient.put<Task>(`/tasks/${taskId}`, body);
    return data;
  },

  patch: async (taskId: string, body: Partial<CreateTaskRequest>): Promise<Task> => {
    const { data } = await apiClient.patch<Task>(`/tasks/${taskId}`, body);
    return data;
  },

  delete: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}`);
  },

  assign: async (taskId: string, assigneeId: string, note?: string): Promise<Task> => {
    const { data } = await apiClient.post<Task>(`/tasks/${taskId}/assign`, {
      assigneeId,
      note,
    });
    return data;
  },

  updateTags: async (taskId: string, tags: string[]): Promise<Task> => {
    const { data } = await apiClient.put<Task>(`/tasks/${taskId}/tags`, {
      tags,
    });
    return data;
  },
};

export const usersApi = {
  list: async (params?: { search?: string; page?: number; limit?: number }): Promise<UserListResponse> => {
    const { data } = await apiClient.get<UserListResponse>('/users', {
      params,
    });
    return data;
  },
};
