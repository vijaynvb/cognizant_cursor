"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.post('/login', (0, validate_1.validateRequest)(validators_1.loginSchema), (req, res, next) => authController_1.authController.login(req, res, next));
router.post('/sso/callback', (0, validate_1.validateRequest)(validators_1.ssoCallbackSchema), (req, res, next) => authController_1.authController.ssoCallback(req, res, next));
router.post('/refresh', (0, validate_1.validateRequest)(validators_1.refreshTokenSchema), (req, res, next) => authController_1.authController.refreshToken(req, res, next));
exports.authRoutes = router;
//# sourceMappingURL=authRoutes.js.map