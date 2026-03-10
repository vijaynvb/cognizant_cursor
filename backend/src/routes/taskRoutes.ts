import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest, validate } from '../middleware/validate';
import {
  createTaskSchema,
  updateTaskSchema,
  patchTaskSchema,
  assignTaskSchema,
  updateTagsSchema,
} from '../validators';
import { taskListQuerySchema, taskIdParamSchema } from '../validators/common';
import { z } from 'zod';

const router = Router();

router.use(authMiddleware);

router.get(
  '/',
  validate(taskListQuerySchema, 'query'),
  (req, res, next) => taskController.listTasks(req, res, next)
);
router.post(
  '/',
  validate(createTaskSchema.shape.body, 'body'),
  (req, res, next) => taskController.createTask(req, res, next)
);
router.get(
  '/:taskId',
  validate(taskIdParamSchema.shape.params, 'params'),
  (req, res, next) => taskController.getTask(req, res, next)
);
router.put(
  '/:taskId',
  validateRequest(
    z.object({ body: updateTaskSchema.shape.body, params: taskIdParamSchema.shape.params })
  ),
  (req, res, next) => taskController.updateTask(req, res, next)
);
router.patch(
  '/:taskId',
  validateRequest(
    z.object({ body: patchTaskSchema.shape.body, params: taskIdParamSchema.shape.params })
  ),
  (req, res, next) => taskController.patchTask(req, res, next)
);
router.delete(
  '/:taskId',
  validate(taskIdParamSchema.shape.params, 'params'),
  (req, res, next) => taskController.deleteTask(req, res, next)
);
router.post(
  '/:taskId/assign',
  validateRequest(
    z.object({ body: assignTaskSchema.shape.body, params: taskIdParamSchema.shape.params })
  ),
  (req, res, next) => taskController.assignTask(req, res, next)
);
router.put(
  '/:taskId/tags',
  validateRequest(
    z.object({ body: updateTagsSchema.shape.body, params: taskIdParamSchema.shape.params })
  ),
  (req, res, next) => taskController.updateTaskTags(req, res, next)
);

export const taskRoutes = router;
