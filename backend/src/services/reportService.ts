import { taskService } from './taskService';
import type {
  CompletedTasksReport,
  OverdueTasksReport,
  ProductivityReport,
} from '../dto';

export class ReportService {
  async getCompletedReport(
    userId: string,
    params: {
      startDate?: string;
      endDate?: string;
      assigneeId?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<CompletedTasksReport> {
    const filters = {
      status: 'completed' as const,
      assigneeId: params.assigneeId,
    };
    const pagination = {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
    };

    const result = await taskService.listTasks(userId, filters, pagination);

    return {
      ...result,
      period: {
        startDate: params.startDate,
        endDate: params.endDate,
      },
    };
  }

  async getOverdueReport(
    userId: string,
    params: {
      assigneeId?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<OverdueTasksReport> {
    const filters = {
      overdueOnly: true,
      assigneeId: params.assigneeId,
    };
    const pagination = {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
    };

    return taskService.listTasks(userId, filters, pagination);
  }

  async getProductivityReport(
    _userId: string,
    params: {
      startDate?: string;
      endDate?: string;
      assigneeId?: string;
    }
  ): Promise<ProductivityReport> {
    // TODO: Implement aggregate queries via TaskRepository
    return {
      data: {
        totalTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
        completionRate: 0,
        averageCompletionTimeDays: 0,
      },
      period: {
        startDate: params.startDate,
        endDate: params.endDate,
      },
    };
  }
}

export const reportService = new ReportService();
