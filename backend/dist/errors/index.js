"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.NotFoundError = exports.AppError = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
/** Base application error with consistent shape. */
class AppError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, statusCode = 500, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
/** 404 Not Found error. */
class NotFoundError extends AppError {
    constructor(code, message) {
        super(code, message, 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
/** 400 Validation error. */
class ValidationError extends AppError {
    constructor(message, details) {
        super('VALIDATION_ERROR', message, 400, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
/** 401 Unauthorized error. */
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super('UNAUTHORIZED', message, 401);
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
/** 403 Forbidden error. */
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super('FORBIDDEN', message, 403);
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
/** Centralized error handler middleware. Returns consistent JSON error shape per OpenAPI. */
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
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
//# sourceMappingURL=index.js.map