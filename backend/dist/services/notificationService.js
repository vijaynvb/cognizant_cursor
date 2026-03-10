"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
function toNotificationDto(row) {
    return {
        id: row.id,
        type: row.type,
        title: row.title,
        message: row.message,
        taskId: row.taskId ?? undefined,
        isRead: row.isRead,
        createdAt: row.createdAt.toISOString(),
    };
}
class NotificationService {
    async listNotifications(userId, params) {
        const { data, totalCount } = await repositories_1.notificationRepository.findByUserId(userId, {
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
    async markNotificationRead(userId, notificationId) {
        const notification = await repositories_1.notificationRepository.findById(notificationId);
        if (!notification || notification.userId !== userId) {
            throw new errors_1.NotFoundError('NOTIFICATION_NOT_FOUND', `Notification with id ${notificationId} was not found`);
        }
        const updated = await repositories_1.notificationRepository.markAsRead(notificationId);
        return toNotificationDto(updated);
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
//# sourceMappingURL=notificationService.js.map