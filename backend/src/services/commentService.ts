import { commentRepository, taskRepository } from '../repositories';
import type { Comment, CommentListResponse } from '../dto';
import type { CreateCommentInput } from '../validators';
import { NotFoundError, ForbiddenError } from '../errors';

function toCommentDto(row: {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  author: { displayName: string };
}): Comment {
  return {
    id: row.id,
    taskId: row.taskId,
    authorId: row.authorId,
    authorName: row.author.displayName,
    content: row.content,
    createdAt: row.createdAt.toISOString(),
  };
}

export class CommentService {
  async listComments(
    _userId: string,
    taskId: string,
    pagination: { page: number; limit: number }
  ): Promise<CommentListResponse> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }

    const { data, totalCount } = await commentRepository.findByTaskId(taskId, pagination);
    const totalPages = Math.ceil(totalCount / pagination.limit);

    return {
      data: data.map((c) =>
        toCommentDto({
          ...c,
          author: c.author as { displayName: string },
        })
      ),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        totalCount,
        totalPages,
      },
    };
  }

  async addComment(
    userId: string,
    taskId: string,
    input: CreateCommentInput
  ): Promise<Comment> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }

    const comment = await commentRepository.create({
      taskId,
      authorId: userId,
      content: input.content,
    });

    return toCommentDto({
      ...comment,
      author: comment.author as { displayName: string },
    });
  }

  async deleteComment(
    userId: string,
    taskId: string,
    commentId: string
  ): Promise<void> {
    const comment = await commentRepository.findById(commentId);
    if (!comment || comment.taskId !== taskId) {
      throw new NotFoundError('COMMENT_NOT_FOUND', `Comment with id ${commentId} was not found`);
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenError('Not authorized to delete this comment');
    }

    await commentRepository.delete(commentId);
  }
}

export const commentService = new CommentService();
