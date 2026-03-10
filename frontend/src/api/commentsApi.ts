import { apiClient } from './client';
import type { Comment, CommentListResponse } from '../types/api';

export const commentsApi = {
  list: async (
    taskId: string,
    params?: { page?: number; limit?: number }
  ): Promise<CommentListResponse> => {
    const { data } = await apiClient.get<CommentListResponse>(
      `/tasks/${taskId}/comments`,
      { params }
    );
    return data;
  },

  add: async (taskId: string, content: string): Promise<Comment> => {
    const { data } = await apiClient.post<Comment>(
      `/tasks/${taskId}/comments`,
      { content }
    );
    return data;
  },

  delete: async (taskId: string, commentId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}/comments/${commentId}`);
  },
};
