"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = exports.ReportController = void 0;
const services_1 = require("../services");
class ReportController {
    async getCompletedReport(req, res, next) {
        try {
            const userId = req.user.userId;
            const { startDate, endDate, assigneeId, page, limit } = req.query;
            const result = await services_1.reportService.getCompletedReport(userId, {
                startDate,
                endDate,
                assigneeId,
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getOverdueReport(req, res, next) {
        try {
            const userId = req.user.userId;
            const { assigneeId, page, limit } = req.query;
            const result = await services_1.reportService.getOverdueReport(userId, {
                assigneeId,
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getProductivityReport(req, res, next) {
        try {
            const userId = req.user.userId;
            const { startDate, endDate, assigneeId } = req.query;
            const result = await services_1.reportService.getProductivityReport(userId, {
                startDate,
                endDate,
                assigneeId,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ReportController = ReportController;
exports.reportController = new ReportController();
//# sourceMappingURL=reportController.js.map