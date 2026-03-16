import { z } from 'zod';

const taskStatusEnum = z.enum(['todo', 'inProgress', 'blocked', 'completed']);
const taskPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);
const sortEnum = z.enum(['dueDate', 'createdAt', 'priority', 'status']);

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const taskListQuerySchema = paginationQuerySchema.extend({
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  assigneeId: z.string().optional(),
  overdueOnly: z.coerce.boolean().optional().default(false),
  tag: z.string().optional(),
  sort: sortEnum.optional().default('dueDate'),
});

export const taskIdParamSchema = z.object({
  params: z.object({
    taskId: z.string().min(1, 'Task ID is required'),
  }),
});

export const commentIdParamSchema = z.object({
  params: z.object({
    taskId: z.string().min(1, 'Task ID is required'),
    commentId: z.string().min(1, 'Comment ID is required'),
  }),
});

export const notificationIdParamSchema = z.object({
  params: z.object({
    notificationId: z.string().min(1, 'Notification ID is required'),
  }),
});

export const reportQuerySchema = paginationQuerySchema.extend({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  assigneeId: z.string().optional(),
});

export const productivityReportQuerySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  assigneeId: z.string().optional(),
});

export const userListQuerySchema = paginationQuerySchema.extend({
  search: z.string().max(200).optional(),
});
