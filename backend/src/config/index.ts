/**
 * Application configuration loaded from environment variables.
 */
const nodeEnv = process.env.NODE_ENV ?? 'development';
const jwtSecret = process.env.JWT_SECRET ?? 'change-me-in-production';

if (nodeEnv === 'production' && (jwtSecret === 'change-me-in-production' || jwtSecret.length < 32)) {
  throw new Error('JWT_SECRET must be set to a strong, unique value (min 32 chars) in production');
}

export const config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv,
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://localhost:5432/todo_app',
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d',
} as const;
