"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const services_1 = require("../services");
class UserController {
    async listUsers(req, res, next) {
        try {
            const userId = req.user.userId;
            const { search, page, limit } = req.query;
            const result = await services_1.userService.listUsers(userId, {
                search,
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map