"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userListQuerySchema = exports.productivityReportQuerySchema = exports.reportQuerySchema = exports.notificationIdParamSchema = exports.commentIdParamSchema = exports.taskIdParamSchema = exports.taskListQuerySchema = exports.paginationQuerySchema = void 0;
const zod_1 = require("zod");
const taskStatusEnum = zod_1.z.enum(['todo', 'inProgress', 'blocked', 'completed']);
const taskPriorityEnum = zod_1.z.enum(['low', 'medium', 'high', 'critical']);
const sortEnum = zod_1.z.enum(['dueDate', 'createdAt', 'priority', 'status']);
exports.paginationQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
});
exports.taskListQuerySchema = exports.paginationQuerySchema.extend({
    status: taskStatusEnum.optional(),
    priority: taskPriorityEnum.optional(),
    assigneeId: zod_1.z.string().optional(),
    overdueOnly: zod_1.z.coerce.boolean().optional().default(false),
    tag: zod_1.z.string().optional(),
    sort: sortEnum.optional().default('dueDate'),
});
exports.taskIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        taskId: zod_1.z.string().min(1, 'Task ID is required'),
    }),
});
exports.commentIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        taskId: zod_1.z.string().min(1, 'Task ID is required'),
        commentId: zod_1.z.string().min(1, 'Comment ID is required'),
    }),
});
exports.notificationIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        notificationId: zod_1.z.string().min(1, 'Notification ID is required'),
    }),
});
exports.reportQuerySchema = exports.paginationQuerySchema.extend({
    startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    assigneeId: zod_1.z.string().optional(),
});
exports.productivityReportQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    assigneeId: zod_1.z.string().optional(),
});
exports.userListQuerySchema = exports.paginationQuerySchema.extend({
    search: zod_1.z.string().max(200).optional(),
});
//# sourceMappingURL=common.js.map