import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import type { LoginInput, SsoCallbackInput, RefreshTokenInput } from '../validators';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body as LoginInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async ssoCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.validateSsoToken(req.body as SsoCallbackInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.refreshToken(req.body as RefreshTokenInput);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
