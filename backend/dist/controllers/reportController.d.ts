import { Request, Response, NextFunction } from 'express';
export declare class ReportController {
    getCompletedReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    getOverdueReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProductivityReport(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const reportController: ReportController;
//# sourceMappingURL=reportController.d.ts.map