import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const ssoCallbackSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type SsoCallbackInput = z.infer<typeof ssoCallbackSchema>['body'];
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>['body'];
