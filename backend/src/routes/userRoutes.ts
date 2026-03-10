import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { userListQuerySchema } from '../validators/common';

const router = Router();

router.use(authMiddleware);

router.get(
  '/',
  validate(userListQuerySchema, 'query'),
  (req, res, next) => userController.listUsers(req, res, next)
);

export const userRoutes = router;
