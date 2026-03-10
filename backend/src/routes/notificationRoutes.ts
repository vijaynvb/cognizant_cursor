import { Router } from 'express';
import { notificationController } from '../controllers/notificationController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  notificationIdParamSchema,
  paginationQuerySchema,
} from '../validators/common';
import { z } from 'zod';

const router = Router();

const notificationListQuerySchema = paginationQuerySchema.extend({
  unreadOnly: z.coerce.boolean().optional().default(false),
});

router.use(authMiddleware);

router.get(
  '/',
  validate(notificationListQuerySchema, 'query'),
  (req, res, next) => notificationController.listNotifications(req, res, next)
);
router.patch(
  '/:notificationId/read',
  validate(notificationIdParamSchema.shape.params, 'params'),
  (req, res, next) => notificationController.markNotificationRead(req, res, next)
);

export const notificationRoutes = router;
