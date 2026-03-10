export interface ListNotificationsParams {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
}
export declare class NotificationRepository {
    findByUserId(userId: string, params?: ListNotificationsParams): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            taskId: string | null;
            userId: string;
            type: string;
            message: string;
            isRead: boolean;
        }[];
        totalCount: number;
    }>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        taskId: string | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    } | null>;
    create(data: {
        userId: string;
        type: string;
        title: string;
        message: string;
        taskId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        taskId: string | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        taskId: string | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
}
export declare const notificationRepository: NotificationRepository;
//# sourceMappingURL=notificationRepository.d.ts.map