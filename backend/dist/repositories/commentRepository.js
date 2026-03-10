"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = exports.CommentRepository = void 0;
const prisma_1 = require("./prisma");
class CommentRepository {
    async findByTaskId(taskId, pagination = {}) {
        const { page = 1, limit = 20 } = pagination;
        const skip = (page - 1) * limit;
        const [data, totalCount] = await Promise.all([
            prisma_1.prisma.comment.findMany({
                where: { taskId },
                skip,
                take: limit,
                orderBy: { createdAt: 'asc' },
                include: {
                    author: {
                        select: { id: true, displayName: true },
                    },
                },
            }),
            prisma_1.prisma.comment.count({ where: { taskId } }),
        ]);
        return { data, totalCount };
    }
    async findById(id) {
        return prisma_1.prisma.comment.findUnique({
            where: { id },
            include: {
                author: {
                    select: { id: true, displayName: true },
                },
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.comment.create({
            data,
            include: {
                author: {
                    select: { id: true, displayName: true },
                },
            },
        });
    }
    async delete(id) {
        return prisma_1.prisma.comment.delete({
            where: { id },
        });
    }
    async deleteByTaskId(taskId) {
        return prisma_1.prisma.comment.deleteMany({
            where: { taskId },
        });
    }
}
exports.CommentRepository = CommentRepository;
exports.commentRepository = new CommentRepository();
//# sourceMappingURL=commentRepository.js.map