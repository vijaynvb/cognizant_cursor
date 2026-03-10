import { Request, Response, NextFunction } from 'express';
/** Base application error with consistent shape. */
export declare class AppError extends Error {
    readonly code: string;
    readonly statusCode: number;
    readonly details?: Array<{
        field?: string;
        message: string;
    }> | undefined;
    constructor(code: string, message: string, statusCode?: number, details?: Array<{
        field?: string;
        message: string;
    }> | undefined);
}
/** 404 Not Found error. */
export declare class NotFoundError extends AppError {
    constructor(code: string, message: string);
}
/** 400 Validation error. */
export declare class ValidationError extends AppError {
    constructor(message: string, details?: Array<{
        field?: string;
        message: string;
    }>);
}
/** 401 Unauthorized error. */
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
/** 403 Forbidden error. */
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
/** Centralized error handler middleware. Returns consistent JSON error shape per OpenAPI. */
export declare function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=index.d.ts.map