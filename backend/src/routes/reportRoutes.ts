import { Router } from 'express';
import { reportController } from '../controllers/reportController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  reportQuerySchema,
  productivityReportQuerySchema,
} from '../validators/common';

const router = Router();

router.use(authMiddleware);

router.get(
  '/completed',
  validate(reportQuerySchema, 'query'),
  (req, res, next) => reportController.getCompletedReport(req, res, next)
);
router.get(
  '/overdue',
  validate(reportQuerySchema, 'query'),
  (req, res, next) => reportController.getOverdueReport(req, res, next)
);
router.get(
  '/productivity',
  validate(productivityReportQuerySchema, 'query'),
  (req, res, next) => reportController.getProductivityReport(req, res, next)
);

export const reportRoutes = router;
