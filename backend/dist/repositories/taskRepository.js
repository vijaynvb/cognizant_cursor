"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepository = exports.TaskRepository = void 0;
const prisma_1 = require("./prisma");
class TaskRepository {
    async findById(id) {
        return prisma_1.prisma.task.findUnique({
            where: { id },
            include: {
                assignee: {
                    select: { id: true, email: true, displayName: true, role: true },
                },
            },
        });
    }
    async findMany(filters, pagination) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;
        const where = {};
        if (filters.status)
            where.status = filters.status;
        if (filters.priority)
            where.priority = filters.priority;
        if (filters.assigneeId)
            where.assigneeId = filters.assigneeId;
        if (filters.overdueOnly) {
            where.dueDate = { lt: new Date() };
            where.status = { not: 'completed' };
        }
        if (filters.tag) {
            where.tags = { has: filters.tag };
        }
        let orderBy = { dueDate: 'asc' };
        switch (filters.sort ?? 'dueDate') {
            case 'createdAt':
                orderBy = { createdAt: 'desc' };
                break;
            case 'priority':
                orderBy = { priority: 'desc' };
                break;
            case 'status':
                orderBy = { status: 'asc' };
                break;
            default:
                orderBy = { dueDate: 'asc' };
        }
        const [data, totalCount] = await Promise.all([
            prisma_1.prisma.task.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    assignee: {
                        select: { id: true, displayName: true },
                    },
                },
            }),
            prisma_1.prisma.task.count({ where }),
        ]);
        return { data, totalCount };
    }
    async create(data) {
        return prisma_1.prisma.task.create({
            data: {
                ...data,
                tags: data.tags ?? [],
            },
            include: {
                assignee: {
                    select: { id: true, displayName: true },
                },
            },
        });
    }
    async update(id, data) {
        return prisma_1.prisma.task.update({
            where: { id },
            data,
            include: {
                assignee: {
                    select: { id: true, displayName: true },
                },
            },
        });
    }
    async delete(id) {
        return prisma_1.prisma.task.delete({
            where: { id },
        });
    }
}
exports.TaskRepository = TaskRepository;
exports.taskRepository = new TaskRepository();
//# sourceMappingURL=taskRepository.js.map