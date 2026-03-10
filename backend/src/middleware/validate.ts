import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Creates validation middleware for request body, query, or params.
 * Validates at the edge and returns 400 with OpenAPI error shape on failure.
 */
export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = req[target];
    const result = schema.safeParse(data);

    if (result.success) {
      req[target] = result.data;
      next();
      return;
    }

    const zodError = result.error as ZodError;
    const details = zodError.errors.map((e) => ({
      field: e.path.join('.') || undefined,
      message: e.message,
    }));

    next(new ValidationError('Validation failed', details));
  };
}

/**
 * Validates a schema that has nested body/query/params.
 * Use for schemas like: z.object({ body: z.object({...}), params: z.object({...}) })
 */
export function validateRequest(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = { body: req.body, query: req.query, params: req.params };
    const result = schema.safeParse(data);

    if (result.success) {
      const data = result.data as Record<string, unknown>;
      if (data.body !== undefined) req.body = data.body as typeof req.body;
      if (data.query !== undefined) req.query = data.query as typeof req.query;
      if (data.params !== undefined) req.params = data.params as typeof req.params;
      next();
      return;
    }

    const zodError = result.error as ZodError;
    const details = zodError.errors.map((e) => ({
      field: e.path.join('.') || undefined,
      message: e.message,
    }));

    next(new ValidationError('Validation failed', details));
  };
}
