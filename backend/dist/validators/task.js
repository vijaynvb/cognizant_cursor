"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTagsSchema = exports.assignTaskSchema = exports.patchTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const taskStatusEnum = zod_1.z.enum(['todo', 'inProgress', 'blocked', 'completed']);
const taskPriorityEnum = zod_1.z.enum(['low', 'medium', 'high', 'critical']);
exports.createTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required').max(200),
        description: zod_1.z.string().max(2000).optional(),
        priority: taskPriorityEnum.optional().default('medium'),
        status: taskStatusEnum.optional().default('todo'),
        dueDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        assigneeId: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).max(10).optional(),
    }),
});
exports.updateTaskSchema = exports.createTaskSchema;
exports.patchTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(200).optional(),
        description: zod_1.z.string().max(2000).optional(),
        priority: taskPriorityEnum.optional(),
        status: taskStatusEnum.optional(),
        dueDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        assigneeId: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).max(10).optional(),
    }),
});
exports.assignTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        assigneeId: zod_1.z.string().min(1, 'Assignee ID is required'),
        note: zod_1.z.string().max(500).optional(),
    }),
});
exports.updateTagsSchema = zod_1.z.object({
    body: zod_1.z.object({
        tags: zod_1.z.array(zod_1.z.string().max(50)).max(10),
    }),
});
//# sourceMappingURL=task.js.map