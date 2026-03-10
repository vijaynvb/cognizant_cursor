"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepository = exports.NotificationRepository = void 0;
const prisma_1 = require("./prisma");
class NotificationRepository {
    async findByUserId(userId, params = {}) {
        const { page = 1, limit = 20, unreadOnly = false } = params;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (unreadOnly)
            where.isRead = false;
        const [data, totalCount] = await Promise.all([
            prisma_1.prisma.notification.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.prisma.notification.count({ where }),
        ]);
        return { data, totalCount };
    }
    async findById(id) {
        return prisma_1.prisma.notification.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma_1.prisma.notification.create({
            data,
        });
    }
    async markAsRead(id) {
        return prisma_1.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
}
exports.NotificationRepository = NotificationRepository;
exports.notificationRepository = new NotificationRepository();
//# sourceMappingURL=notificationRepository.js.map