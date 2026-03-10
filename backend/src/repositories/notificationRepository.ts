import { prisma } from './prisma';

export interface ListNotificationsParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}

export class NotificationRepository {
  async findByUserId(userId: string, params: ListNotificationsParams = {}) {
    const { page = 1, limit = 20, unreadOnly = false } = params;
    const skip = (page - 1) * limit;

    const where: { userId: string; isRead?: boolean } = { userId };
    if (unreadOnly) where.isRead = false;

    const [data, totalCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
    ]);

    return { data, totalCount };
  }

  async findById(id: string) {
    return prisma.notification.findUnique({
      where: { id },
    });
  }

  async create(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    taskId?: string;
  }) {
    return prisma.notification.create({
      data,
    });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}

export const notificationRepository = new NotificationRepository();
