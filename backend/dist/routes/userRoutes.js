"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const common_1 = require("../validators/common");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', (0, validate_1.validate)(common_1.userListQuerySchema, 'query'), (req, res, next) => userController_1.userController.listUsers(req, res, next));
exports.userRoutes = router;
//# sourceMappingURL=userRoutes.js.map