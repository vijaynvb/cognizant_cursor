import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            requestId?: string;
        }
    }
}
/** Attaches a correlation/request ID to each request for tracing. */
export declare function requestIdMiddleware(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=requestId.d.ts.map