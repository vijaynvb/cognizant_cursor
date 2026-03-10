import type { Notification, NotificationListResponse } from '../dto';
export declare class NotificationService {
    listNotifications(userId: string, params: {
        page?: number;
        limit?: number;
        unreadOnly?: boolean;
    }): Promise<NotificationListResponse>;
    markNotificationRead(userId: string, notificationId: string): Promise<Notification>;
}
export declare const notificationService: NotificationService;
//# sourceMappingURL=notificationService.d.ts.map