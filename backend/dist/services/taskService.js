"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.TaskService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
function toTaskDto(row) {
    const dueDate = row.dueDate?.toISOString().slice(0, 10);
    const isOverdue = row.status !== 'completed' &&
        !!row.dueDate &&
        row.dueDate < new Date();
    return {
        id: row.id,
        title: row.title,
        description: row.description ?? undefined,
        priority: row.priority,
        status: row.status,
        dueDate,
        assigneeId: row.assigneeId ?? undefined,
        assigneeName: row.assignee?.displayName,
        tags: row.tags,
        isOverdue,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
    };
}
class TaskService {
    async listTasks(_userId, filters, pagination) {
        const { data, totalCount } = await repositories_1.taskRepository.findMany(filters, pagination);
        const totalPages = Math.ceil(totalCount / pagination.limit);
        return {
            data: data.map(toTaskDto),
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalCount,
                totalPages,
            },
        };
    }
    async createTask(_userId, dto) {
        if (dto.assigneeId) {
            const assignee = await repositories_1.userRepository.findById(dto.assigneeId);
            if (!assignee) {
                throw new errors_1.NotFoundError('USER_NOT_FOUND', `User ${dto.assigneeId} not found`);
            }
        }
        const task = await repositories_1.taskRepository.create({
            title: dto.title,
            description: dto.description,
            priority: dto.priority ?? 'medium',
            status: dto.status ?? 'todo',
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            assigneeId: dto.assigneeId,
            tags: dto.tags,
        });
        return toTaskDto(task);
    }
    async getTask(_userId, taskId) {
        const task = await repositories_1.taskRepository.findById(taskId);
        if (!task) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        return toTaskDto(task);
    }
    async updateTask(_userId, taskId, dto) {
        const existing = await repositories_1.taskRepository.findById(taskId);
        if (!existing) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        if (dto.assigneeId) {
            const assignee = await repositories_1.userRepository.findById(dto.assigneeId);
            if (!assignee) {
                throw new errors_1.NotFoundError('USER_NOT_FOUND', `User ${dto.assigneeId} not found`);
            }
        }
        const task = await repositories_1.taskRepository.update(taskId, {
            title: dto.title,
            description: dto.description,
            priority: dto.priority,
            status: dto.status,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            assigneeId: dto.assigneeId,
            tags: dto.tags,
        });
        return toTaskDto(task);
    }
    async patchTask(_userId, taskId, dto) {
        const existing = await repositories_1.taskRepository.findById(taskId);
        if (!existing) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        const updates = {};
        if (dto.title !== undefined)
            updates.title = dto.title;
        if (dto.description !== undefined)
            updates.description = dto.description;
        if (dto.priority !== undefined)
            updates.priority = dto.priority;
        if (dto.status !== undefined)
            updates.status = dto.status;
        if (dto.dueDate !== undefined)
            updates.dueDate = new Date(dto.dueDate);
        if (dto.assigneeId !== undefined)
            updates.assigneeId = dto.assigneeId;
        if (dto.tags !== undefined)
            updates.tags = dto.tags;
        const task = await repositories_1.taskRepository.update(taskId, updates);
        return toTaskDto(task);
    }
    async deleteTask(_userId, taskId) {
        const existing = await repositories_1.taskRepository.findById(taskId);
        if (!existing) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        await repositories_1.taskRepository.delete(taskId);
    }
    async assignTask(_userId, taskId, input) {
        const task = await repositories_1.taskRepository.findById(taskId);
        if (!task) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        const assignee = await repositories_1.userRepository.findById(input.assigneeId);
        if (!assignee) {
            throw new errors_1.NotFoundError('USER_NOT_FOUND', `User ${input.assigneeId} not found`);
        }
        const updated = await repositories_1.taskRepository.update(taskId, { assigneeId: input.assigneeId });
        return toTaskDto(updated);
    }
    async updateTaskTags(_userId, taskId, input) {
        const task = await repositories_1.taskRepository.findById(taskId);
        if (!task) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        const updated = await repositories_1.taskRepository.update(taskId, { tags: input.tags });
        return toTaskDto(updated);
    }
}
exports.TaskService = TaskService;
exports.taskService = new TaskService();
//# sourceMappingURL=taskService.js.map