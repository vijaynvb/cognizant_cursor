"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = exports.NotificationController = void 0;
const services_1 = require("../services");
class NotificationController {
    async listNotifications(req, res, next) {
        try {
            const userId = req.user.userId;
            const { page, limit, unreadOnly } = req.query;
            const result = await services_1.notificationService.listNotifications(userId, {
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                unreadOnly: unreadOnly === 'true',
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async markNotificationRead(req, res, next) {
        try {
            const userId = req.user.userId;
            const { notificationId } = req.params;
            const result = await services_1.notificationService.markNotificationRead(userId, notificationId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.NotificationController = NotificationController;
exports.notificationController = new NotificationController();
//# sourceMappingURL=notificationController.js.map