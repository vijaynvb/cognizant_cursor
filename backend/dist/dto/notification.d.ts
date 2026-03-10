import type { Pagination } from './common';
/** Notification type enum. */
export type NotificationType = 'reminder' | 'assignment' | 'overdue' | 'statusChange';
/** Notification entity. */
export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    taskId?: string;
    isRead: boolean;
    createdAt: string;
}
/** Paginated notification list response. */
export interface NotificationListResponse {
    data: Notification[];
    pagination: Pagination;
}
//# sourceMappingURL=notification.d.ts.map