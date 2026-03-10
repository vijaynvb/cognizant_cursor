import type { Task } from './task';
import type { Pagination } from './common';
/** Period for report. */
export interface ReportPeriod {
    startDate?: string;
    endDate?: string;
}
/** Completed tasks report. */
export interface CompletedTasksReport {
    data: Task[];
    pagination: Pagination;
    period?: ReportPeriod;
}
/** Overdue tasks report. */
export interface OverdueTasksReport {
    data: Task[];
    pagination: Pagination;
}
/** Productivity metrics. */
export interface ProductivityMetrics {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    completionRate: number;
    averageCompletionTimeDays: number;
}
/** Productivity report. */
export interface ProductivityReport {
    data: ProductivityMetrics;
    period: ReportPeriod;
}
//# sourceMappingURL=reports.d.ts.map