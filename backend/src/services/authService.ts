import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userRepository } from '../repositories';
import type { AuthResponse, UserSummary } from '../dto';
import type { LoginInput, SsoCallbackInput, RefreshTokenInput } from '../validators';
import { AppError } from '../errors';

// TODO: Implement refresh token storage (Redis or DB)
const refreshTokenStore = new Map<string, { userId: string; email: string; role: string }>();

function toUserSummary(id: string, email: string, displayName: string, role: string): UserSummary {
  return { id, email, displayName, role: role as UserSummary['role'] };
}

export class AuthService {
  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password', 400);
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password', 400);
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 3600,
    });
    const refreshToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 604800,
    });

    refreshTokenStore.set(refreshToken, payload);

    const expiresIn = 3600; // 1 hour in seconds
    return {
      accessToken,
      refreshToken,
      expiresIn,
      user: toUserSummary(user.id, user.email, user.displayName, user.role),
    };
  }

  async validateSsoToken(_input: SsoCallbackInput): Promise<AuthResponse> {
    // TODO: Validate SSO token with provider, resolve user
    throw new AppError('NOT_IMPLEMENTED', 'SSO callback not implemented', 501);
  }

  async refreshToken(input: RefreshTokenInput): Promise<AuthResponse> {
    try {
      const payload = jwt.verify(input.refreshToken, config.jwtSecret) as {
        userId: string;
        email: string;
        role: string;
      };

      const stored = refreshTokenStore.get(input.refreshToken);
      if (!stored) {
        throw new AppError('INVALID_REFRESH_TOKEN', 'Invalid or expired refresh token', 401);
      }

      const user = await userRepository.findById(payload.userId);
      if (!user) {
        throw new AppError('USER_NOT_FOUND', 'User no longer exists', 401);
      }

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: 3600 }
      );

      const expiresIn = 3600;
      return {
        accessToken,
        refreshToken: input.refreshToken,
        expiresIn,
        user: toUserSummary(user.id, user.email, user.displayName, user.role),
      };
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError('INVALID_REFRESH_TOKEN', 'Invalid or expired refresh token', 401);
    }
  }
}

export const authService = new AuthService();
