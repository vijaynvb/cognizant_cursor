"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = void 0;
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const common_1 = require("../validators/common");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/completed', (0, validate_1.validate)(common_1.reportQuerySchema, 'query'), (req, res, next) => reportController_1.reportController.getCompletedReport(req, res, next));
router.get('/overdue', (0, validate_1.validate)(common_1.reportQuerySchema, 'query'), (req, res, next) => reportController_1.reportController.getOverdueReport(req, res, next));
router.get('/productivity', (0, validate_1.validate)(common_1.productivityReportQuerySchema, 'query'), (req, res, next) => reportController_1.reportController.getProductivityReport(req, res, next));
exports.reportRoutes = router;
//# sourceMappingURL=reportRoutes.js.map