import { prisma } from './prisma';

export interface TaskFilters {
  status?: string;
  priority?: string;
  assigneeId?: string;
  overdueOnly?: boolean;
  tag?: string;
  sort?: 'dueDate' | 'createdAt' | 'priority' | 'status';
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export class TaskRepository {
  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        assignee: {
          select: { id: true, email: true, displayName: true, role: true },
        },
      },
    });
  }

  async findMany(filters: TaskFilters, pagination: PaginationParams) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.assigneeId) where.assigneeId = filters.assigneeId;
    if (filters.overdueOnly) {
      where.dueDate = { lt: new Date() };
      where.status = { not: 'completed' };
    }
    if (filters.tag) {
      where.tags = { has: filters.tag };
    }

    type SortOrder = 'asc' | 'desc';
    let orderBy: Record<string, SortOrder> = { dueDate: 'asc' };
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
      prisma.task.findMany({
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
      prisma.task.count({ where }),
    ]);

    return { data, totalCount };
  }

  async create(data: {
    title: string;
    description?: string;
    priority: string;
    status: string;
    dueDate?: Date;
    assigneeId?: string;
    tags?: string[];
  }) {
    return prisma.task.create({
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

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: Date;
    assigneeId: string;
    tags: string[];
  }>) {
    return prisma.task.update({
      where: { id },
      data,
      include: {
        assignee: {
          select: { id: true, displayName: true },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.task.delete({
      where: { id },
    });
  }
}

export const taskRepository = new TaskRepository();
