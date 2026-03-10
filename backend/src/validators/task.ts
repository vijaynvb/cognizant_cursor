import { z } from 'zod';

const taskStatusEnum = z.enum(['todo', 'inProgress', 'blocked', 'completed']);
const taskPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().max(2000).optional(),
    priority: taskPriorityEnum.optional().default('medium'),
    status: taskStatusEnum.optional().default('todo'),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    assigneeId: z.string().optional(),
    tags: z.array(z.string()).max(10).optional(),
  }),
});

export const updateTaskSchema = createTaskSchema;

export const patchTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    priority: taskPriorityEnum.optional(),
    status: taskStatusEnum.optional(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    assigneeId: z.string().optional(),
    tags: z.array(z.string()).max(10).optional(),
  }),
});

export const assignTaskSchema = z.object({
  body: z.object({
    assigneeId: z.string().min(1, 'Assignee ID is required'),
    note: z.string().max(500).optional(),
  }),
});

export const updateTagsSchema = z.object({
  body: z.object({
    tags: z.array(z.string().max(50)).max(10),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>['body'];
export type PatchTaskInput = z.infer<typeof patchTaskSchema>['body'];
export type AssignTaskInput = z.infer<typeof assignTaskSchema>['body'];
export type UpdateTagsInput = z.infer<typeof updateTagsSchema>['body'];
