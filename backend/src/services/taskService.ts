import { taskRepository, userRepository } from '../repositories';
import type {
  Task,
  TaskListResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  PatchTaskRequest,
} from '../dto';
import type { CreateTaskInput, UpdateTaskInput, PatchTaskInput, AssignTaskInput, UpdateTagsInput } from '../validators';
import { NotFoundError } from '../errors';
import type { TaskFilters } from '../repositories/taskRepository';

function toTaskDto(row: {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  dueDate: Date | null;
  assigneeId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  assignee?: { displayName: string } | null;
}): Task {
  const dueDate = row.dueDate?.toISOString().slice(0, 10);
  const isOverdue =
    row.status !== 'completed' &&
    !!row.dueDate &&
    row.dueDate < new Date();

  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    priority: row.priority as Task['priority'],
    status: row.status as Task['status'],
    dueDate,
    assigneeId: row.assigneeId ?? undefined,
    assigneeName: row.assignee?.displayName,
    tags: row.tags,
    isOverdue,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export class TaskService {
  async listTasks(
    _userId: string,
    filters: TaskFilters,
    pagination: { page: number; limit: number }
  ): Promise<TaskListResponse> {
    const { data, totalCount } = await taskRepository.findMany(filters, pagination);
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

  async createTask(_userId: string, dto: CreateTaskRequest | CreateTaskInput): Promise<Task> {
    if (dto.assigneeId) {
      const assignee = await userRepository.findById(dto.assigneeId);
      if (!assignee) {
        throw new NotFoundError('USER_NOT_FOUND', `User ${dto.assigneeId} not found`);
      }
    }

    const task = await taskRepository.create({
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

  async getTask(_userId: string, taskId: string): Promise<Task> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }
    return toTaskDto(task);
  }

  async updateTask(
    _userId: string,
    taskId: string,
    dto: UpdateTaskRequest | UpdateTaskInput
  ): Promise<Task> {
    const existing = await taskRepository.findById(taskId);
    if (!existing) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }

    if (dto.assigneeId) {
      const assignee = await userRepository.findById(dto.assigneeId);
      if (!assignee) {
        throw new NotFoundError('USER_NOT_FOUND', `User ${dto.assigneeId} not found`);
      }
    }

    const task = await taskRepository.update(taskId, {
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

  async patchTask(
    _userId: string,
    taskId: string,
    dto: PatchTaskRequest | PatchTaskInput
  ): Promise<Task> {
    const existing = await taskRepository.findById(taskId);
    if (!existing) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }

    const updates: Record<string, unknown> = {};
    if (dto.title !== undefined) updates.title = dto.title;
    if (dto.description !== undefined) updates.description = dto.description;
    if (dto.priority !== undefined) updates.priority = dto.priority;
    if (dto.status !== undefined) updates.status = dto.status;
    if (dto.dueDate !== undefined) updates.dueDate = new Date(dto.dueDate);
    if (dto.assigneeId !== undefined) updates.assigneeId = dto.assigneeId;
    if (dto.tags !== undefined) updates.tags = dto.tags;

    const task = await taskRepository.update(taskId, updates);
    return toTaskDto(task);
  }

  async deleteTask(_userId: string, taskId: string): Promise<void> {
    const existing = await taskRepository.findById(taskId);
    if (!existing) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }
    await taskRepository.delete(taskId);
  }

  async assignTask(
    _userId: string,
    taskId: string,
    input: AssignTaskInput
  ): Promise<Task> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }

    const assignee = await userRepository.findById(input.assigneeId);
    if (!assignee) {
      throw new NotFoundError('USER_NOT_FOUND', `User ${input.assigneeId} not found`);
    }

    const updated = await taskRepository.update(taskId, { assigneeId: input.assigneeId });
    return toTaskDto(updated);
  }

  async updateTaskTags(
    _userId: string,
    taskId: string,
    input: UpdateTagsInput
  ): Promise<Task> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundError('TASK_NOT_FOUND', `Task with id ${taskId} was not found`);
    }

    const updated = await taskRepository.update(taskId, { tags: input.tags });
    return toTaskDto(updated);
  }
}

export const taskService = new TaskService();
