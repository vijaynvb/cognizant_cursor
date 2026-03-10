"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const common_1 = require("../validators/common");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const notificationListQuerySchema = common_1.paginationQuerySchema.extend({
    unreadOnly: zod_1.z.coerce.boolean().optional().default(false),
});
router.use(auth_1.authMiddleware);
router.get('/', (0, validate_1.validate)(notificationListQuerySchema, 'query'), (req, res, next) => notificationController_1.notificationController.listNotifications(req, res, next));
router.patch('/:notificationId/read', (0, validate_1.validate)(common_1.notificationIdParamSchema.shape.params, 'params'), (req, res, next) => notificationController_1.notificationController.markNotificationRead(req, res, next));
exports.notificationRoutes = router;
//# sourceMappingURL=notificationRoutes.js.map