import type { Pagination } from './common';

/** Comment entity. */
export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

/** Create comment request. */
export interface CreateCommentRequest {
  content: string;
}

/** Paginated comment list response. */
export interface CommentListResponse {
  data: Comment[];
  pagination: Pagination;
}
