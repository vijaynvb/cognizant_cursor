"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = exports.CommentService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
function toCommentDto(row) {
    return {
        id: row.id,
        taskId: row.taskId,
        authorId: row.authorId,
        authorName: row.author.displayName,
        content: row.content,
        createdAt: row.createdAt.toISOString(),
    };
}
class CommentService {
    async listComments(_userId, taskId, pagination) {
        const task = await repositories_1.taskRepository.findById(taskId);
        if (!task) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        const { data, totalCount } = await repositories_1.commentRepository.findByTaskId(taskId, pagination);
        const totalPages = Math.ceil(totalCount / pagination.limit);
        return {
            data: data.map((c) => toCommentDto({
                ...c,
                author: c.author,
            })),
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalCount,
                totalPages,
            },
        };
    }
    async addComment(userId, taskId, input) {
        const task = await repositories_1.taskRepository.findById(taskId);
        if (!task) {
            throw new errors_1.NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
        }
        const comment = await repositories_1.commentRepository.create({
            taskId,
            authorId: userId,
            content: input.content,
        });
        return toCommentDto({
            ...comment,
            author: comment.author,
        });
    }
    async deleteComment(userId, taskId, commentId) {
        const comment = await repositories_1.commentRepository.findById(commentId);
        if (!comment || comment.taskId !== taskId) {
            throw new errors_1.NotFoundError('COMMENT_NOT_FOUND', `Comment with id ${commentId} was not found`);
        }
        if (comment.authorId !== userId) {
            throw new errors_1.ForbiddenError('Not authorized to delete this comment');
        }
        await repositories_1.commentRepository.delete(commentId);
    }
}
exports.CommentService = CommentService;
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map