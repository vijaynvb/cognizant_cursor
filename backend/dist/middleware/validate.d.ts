import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
type ValidationTarget = 'body' | 'query' | 'params';
/**
 * Creates validation middleware for request body, query, or params.
 * Validates at the edge and returns 400 with OpenAPI error shape on failure.
 */
export declare function validate(schema: ZodSchema, target?: ValidationTarget): (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Validates a schema that has nested body/query/params.
 * Use for schemas like: z.object({ body: z.object({...}), params: z.object({...}) })
 */
export declare function validateRequest(schema: ZodSchema): (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map