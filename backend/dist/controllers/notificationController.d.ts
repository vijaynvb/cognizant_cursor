import { Request, Response, NextFunction } from 'express';
export declare class NotificationController {
    listNotifications(req: Request, res: Response, next: NextFunction): Promise<void>;
    markNotificationRead(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const notificationController: NotificationController;
//# sourceMappingURL=notificationController.d.ts.map