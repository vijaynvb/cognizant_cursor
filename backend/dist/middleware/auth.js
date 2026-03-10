"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const errors_1 = require("../errors");
/**
 * Validates JWT Bearer token and attaches user payload to req.user.
 * Use on routes that require authentication.
 */
function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        next(new errors_1.UnauthorizedError('Missing or invalid authorization header'));
        return;
    }
    const token = authHeader.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        req.user = payload;
        next();
    }
    catch {
        next(new errors_1.UnauthorizedError('Invalid or expired token'));
    }
}
//# sourceMappingURL=auth.js.map