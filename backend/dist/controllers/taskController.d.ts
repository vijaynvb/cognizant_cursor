import { Request, Response, NextFunction } from 'express';
export declare class TaskController {
    listTasks(req: Request, res: Response, next: NextFunction): Promise<void>;
    createTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    patchTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    assignTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTaskTags(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const taskController: TaskController;
//# sourceMappingURL=taskController.d.ts.map