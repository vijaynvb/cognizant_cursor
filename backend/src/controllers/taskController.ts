import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services';
import type { CreateTaskInput, UpdateTaskInput, PatchTaskInput, AssignTaskInput, UpdateTagsInput } from '../validators';

export class TaskController {
  async listTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { page, limit, status, priority, assigneeId, overdueOnly, tag, sort } =
        req.query as Record<string, string | boolean | number>;
      const result = await taskService.listTasks(
        userId,
        { status, priority, assigneeId, overdueOnly: overdueOnly === true, tag, sort } as Parameters<typeof taskService.listTasks>[1],
        { page: Number(page) || 1, limit: Number(limit) || 20 }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await taskService.createTask(userId, req.body as CreateTaskInput);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const result = await taskService.getTask(userId, taskId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const result = await taskService.updateTask(userId, taskId, req.body as UpdateTaskInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async patchTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const result = await taskService.patchTask(userId, taskId, req.body as PatchTaskInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      await taskService.deleteTask(userId, taskId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async assignTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const result = await taskService.assignTask(userId, taskId, req.body as AssignTaskInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateTaskTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { taskId } = req.params;
      const result = await taskService.updateTaskTags(userId, taskId, req.body as UpdateTagsInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const taskController = new TaskController();
