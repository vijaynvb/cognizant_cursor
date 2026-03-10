"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportService = exports.ReportService = void 0;
const taskService_1 = require("./taskService");
class ReportService {
    async getCompletedReport(userId, params) {
        const filters = {
            status: 'completed',
            assigneeId: params.assigneeId,
        };
        const pagination = {
            page: params.page ?? 1,
            limit: params.limit ?? 20,
        };
        const result = await taskService_1.taskService.listTasks(userId, filters, pagination);
        return {
            ...result,
            period: {
                startDate: params.startDate,
                endDate: params.endDate,
            },
        };
    }
    async getOverdueReport(userId, params) {
        const filters = {
            overdueOnly: true,
            assigneeId: params.assigneeId,
        };
        const pagination = {
            page: params.page ?? 1,
            limit: params.limit ?? 20,
        };
        return taskService_1.taskService.listTasks(userId, filters, pagination);
    }
    async getProductivityReport(_userId, params) {
        // TODO: Implement aggregate queries via TaskRepository
        return {
            data: {
                totalTasks: 0,
                completedTasks: 0,
                overdueTasks: 0,
                completionRate: 0,
                averageCompletionTimeDays: 0,
            },
            period: {
                startDate: params.startDate,
                endDate: params.endDate,
            },
        };
    }
}
exports.ReportService = ReportService;
exports.reportService = new ReportService();
//# sourceMappingURL=reportService.js.map