import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateRequest } from '../middleware/validate';
import { loginSchema, ssoCallbackSchema, refreshTokenSchema } from '../validators';

const router = Router();

router.post('/login', validateRequest(loginSchema), (req, res, next) =>
  authController.login(req, res, next)
);
router.post('/sso/callback', validateRequest(ssoCallbackSchema), (req, res, next) =>
  authController.ssoCallback(req, res, next)
);
router.post('/refresh', validateRequest(refreshTokenSchema), (req, res, next) =>
  authController.refreshToken(req, res, next)
);

export const authRoutes = router;
