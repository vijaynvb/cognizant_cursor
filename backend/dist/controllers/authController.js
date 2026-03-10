"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const services_1 = require("../services");
class AuthController {
    async login(req, res, next) {
        try {
            const result = await services_1.authService.login(req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async ssoCallback(req, res, next) {
        try {
            const result = await services_1.authService.validateSsoToken(req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const result = await services_1.authService.refreshToken(req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map