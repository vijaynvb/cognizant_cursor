import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/** Base application error with consistent shape. */
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: Array<{ field?: string; message: string }>
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/** 404 Not Found error. */
export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super(code, message, 404);
    this.name = 'NotFoundError';
  }
}

/** 400 Validation error. */
export class ValidationError extends AppError {
  constructor(message: string, details?: Array<{ field?: string; message: string }>) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

/** 401 Unauthorized error. */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}

/** 403 Forbidden error. */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN', message, 403);
    this.name = 'ForbiddenError';
  }
}

/** Centralized error handler middleware. Returns consistent JSON error shape per OpenAPI. */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    const details = err.errors.map((e) => ({
      field: e.path.join('.') || undefined,
      message: e.message,
    }));
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      timestamp: new Date().toISOString(),
      details,
    });
    return;
  }

  const isAppError = err instanceof AppError;
  const code = isAppError ? err.code : 'INTERNAL_ERROR';
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : 'An unexpected error occurred';
  const details = isAppError ? err.details : undefined;

  res.status(statusCode).json({
    code,
    message,
    timestamp: new Date().toISOString(),
    ...(details && { details }),
  });
}
