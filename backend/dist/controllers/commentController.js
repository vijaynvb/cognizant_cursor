"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = exports.CommentController = void 0;
const services_1 = require("../services");
class CommentController {
    async listComments(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const { page, limit } = req.query;
            const result = await services_1.commentService.listComments(userId, taskId, {
                page: Number(page) || 1,
                limit: Number(limit) || 20,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async addComment(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const result = await services_1.commentService.addComment(userId, taskId, req.body);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteComment(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId, commentId } = req.params;
            await services_1.commentService.deleteComment(userId, taskId, commentId);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CommentController = CommentController;
exports.commentController = new CommentController();
//# sourceMappingURL=commentController.js.map