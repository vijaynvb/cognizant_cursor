import { notificationRepository } from '../repositories';
import type { Notification, NotificationListResponse } from '../dto';
import { NotFoundError } from '../errors';

function toNotificationDto(row: {
  id: string;
  type: string;
  title: string;
  message: string;
  taskId: string | null;
  isRead: boolean;
  createdAt: Date;
}): Notification {
  return {
    id: row.id,
    type: row.type as Notification['type'],
    title: row.title,
    message: row.message,
    taskId: row.taskId ?? undefined,
    isRead: row.isRead,
    createdAt: row.createdAt.toISOString(),
  };
}

export class NotificationService {
  async listNotifications(
    userId: string,
    params: { page?: number; limit?: number; unreadOnly?: boolean }
  ): Promise<NotificationListResponse> {
    const { data, totalCount } = await notificationRepository.findByUserId(userId, {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      unreadOnly: params.unreadOnly ?? false,
    });

    const totalPages = Math.ceil(totalCount / (params.limit ?? 20));

    return {
      data: data.map(toNotificationDto),
      pagination: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        totalCount,
        totalPages,
      },
    };
  }

  async markNotificationRead(
    userId: string,
    notificationId: string
  ): Promise<Notification> {
    const notification = await notificationRepository.findById(notificationId);
    if (!notification || notification.userId !== userId) {
      throw new NotFoundError(
        'NOTIFICATION_NOT_FOUND',
        `Notification with id ${notificationId} was not found`
      );
    }

    const updated = await notificationRepository.markAsRead(notificationId);
    return toNotificationDto(updated);
  }
}

export const notificationService = new NotificationService();
