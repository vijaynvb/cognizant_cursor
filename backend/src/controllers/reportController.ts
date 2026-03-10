import { Request, Response, NextFunction } from 'express';
import { reportService } from '../services';

export class ReportController {
  async getCompletedReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { startDate, endDate, assigneeId, page, limit } = req.query as Record<string, string>;
      const result = await reportService.getCompletedReport(userId, {
        startDate,
        endDate,
        assigneeId,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getOverdueReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { assigneeId, page, limit } = req.query as Record<string, string>;
      const result = await reportService.getOverdueReport(userId, {
        assigneeId,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getProductivityReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { startDate, endDate, assigneeId } = req.query as Record<string, string>;
      const result = await reportService.getProductivityReport(userId, {
        startDate,
        endDate,
        assigneeId,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const reportController = new ReportController();
