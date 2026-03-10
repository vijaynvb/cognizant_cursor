import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services';

export class NotificationController {
  async listNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { page, limit, unreadOnly } = req.query as Record<string, string>;
      const result = await notificationService.listNotifications(userId, {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        unreadOnly: unreadOnly === 'true',
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async markNotificationRead(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { notificationId } = req.params;
      const result = await notificationService.markNotificationRead(
        userId,
        notificationId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const notificationController = new NotificationController();
