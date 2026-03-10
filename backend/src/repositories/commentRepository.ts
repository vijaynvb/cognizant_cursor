import { prisma } from './prisma';

export interface ListCommentsParams {
  page?: number;
  limit?: number;
}

export class CommentRepository {
  async findByTaskId(taskId: string, pagination: ListCommentsParams = {}) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      prisma.comment.findMany({
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
      prisma.comment.count({ where: { taskId } }),
    ]);

    return { data, totalCount };
  }

  async findById(id: string) {
    return prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, displayName: true },
        },
      },
    });
  }

  async create(data: { taskId: string; authorId: string; content: string }) {
    return prisma.comment.create({
      data,
      include: {
        author: {
          select: { id: true, displayName: true },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }

  async deleteByTaskId(taskId: string) {
    return prisma.comment.deleteMany({
      where: { taskId },
    });
  }
}

export const commentRepository = new CommentRepository();
