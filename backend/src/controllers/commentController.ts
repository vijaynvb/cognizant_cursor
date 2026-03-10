import { Request, Response, NextFunction } from 'express';
import { commentService } from '../services';
import type { CreateCommentInput } from '../validators';

export class CommentController {
  async listComments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const { page, limit } = req.query as Record<string, string>;
      const result = await commentService.listComments(userId, taskId, {
        page: Number(page) || 1,
        limit: Number(limit) || 20,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const result = await commentService.addComment(userId, taskId, req.body as CreateCommentInput);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId, commentId } = req.params;
      await commentService.deleteComment(userId, taskId, commentId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const commentController = new CommentController();
