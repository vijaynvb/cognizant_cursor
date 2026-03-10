import type { CompletedTasksReport, OverdueTasksReport, ProductivityReport } from '../dto';
export declare class ReportService {
    getCompletedReport(userId: string, params: {
        startDate?: string;
        endDate?: string;
        assigneeId?: string;
        page?: number;
        limit?: number;
    }): Promise<CompletedTasksReport>;
    getOverdueReport(userId: string, params: {
        assigneeId?: string;
        page?: number;
        limit?: number;
    }): Promise<OverdueTasksReport>;
    getProductivityReport(_userId: string, params: {
        startDate?: string;
        endDate?: string;
        assigneeId?: string;
    }): Promise<ProductivityReport>;
}
export declare const reportService: ReportService;
//# sourceMappingURL=reportService.d.ts.map