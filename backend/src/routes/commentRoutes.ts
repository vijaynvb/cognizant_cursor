import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest, validate } from '../middleware/validate';
import { createCommentSchema } from '../validators';
import {
  taskIdParamSchema,
  commentIdParamSchema,
  paginationQuerySchema,
} from '../validators/common';
import { z } from 'zod';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get(
  '/:taskId/comments',
  validate(taskIdParamSchema.shape.params, 'params'),
  validate(paginationQuerySchema, 'query'),
  (req, res, next) => commentController.listComments(req, res, next)
);
router.post(
  '/:taskId/comments',
  validateRequest(
    z.object({
      body: createCommentSchema.shape.body,
      params: taskIdParamSchema.shape.params,
    })
  ),
  (req, res, next) => commentController.addComment(req, res, next)
);
router.delete(
  '/:taskId/comments/:commentId',
  validate(commentIdParamSchema.shape.params, 'params'),
  (req, res, next) => commentController.deleteComment(req, res, next)
);

export const commentRoutes = router;
