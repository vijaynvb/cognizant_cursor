import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';

export class UserController {
  async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { search, page, limit } = req.query as Record<string, string>;
      const result = await userService.listUsers(userId, {
        search,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
