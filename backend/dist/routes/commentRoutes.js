"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const validators_1 = require("../validators");
const common_1 = require("../validators/common");
const zod_1 = require("zod");
const router = (0, express_1.Router)({ mergeParams: true });
router.use(auth_1.authMiddleware);
router.get('/:taskId/comments', (0, validate_1.validate)(common_1.taskIdParamSchema.shape.params, 'params'), (0, validate_1.validate)(common_1.paginationQuerySchema, 'query'), (req, res, next) => commentController_1.commentController.listComments(req, res, next));
router.post('/:taskId/comments', (0, validate_1.validateRequest)(zod_1.z.object({
    body: validators_1.createCommentSchema.shape.body,
    params: common_1.taskIdParamSchema.shape.params,
})), (req, res, next) => commentController_1.commentController.addComment(req, res, next));
router.delete('/:taskId/comments/:commentId', (0, validate_1.validate)(common_1.commentIdParamSchema.shape.params, 'params'), (req, res, next) => commentController_1.commentController.deleteComment(req, res, next));
exports.commentRoutes = router;
//# sourceMappingURL=commentRoutes.js.map