import type { Task, TaskListResponse, CreateTaskRequest, UpdateTaskRequest, PatchTaskRequest } from '../dto';
import type { CreateTaskInput, UpdateTaskInput, PatchTaskInput, AssignTaskInput, UpdateTagsInput } from '../validators';
import type { TaskFilters } from '../repositories/taskRepository';
export declare class TaskService {
    listTasks(_userId: string, filters: TaskFilters, pagination: {
        page: number;
        limit: number;
    }): Promise<TaskListResponse>;
    createTask(_userId: string, dto: CreateTaskRequest | CreateTaskInput): Promise<Task>;
    getTask(_userId: string, taskId: string): Promise<Task>;
    updateTask(_userId: string, taskId: string, dto: UpdateTaskRequest | UpdateTaskInput): Promise<Task>;
    patchTask(_userId: string, taskId: string, dto: PatchTaskRequest | PatchTaskInput): Promise<Task>;
    deleteTask(_userId: string, taskId: string): Promise<void>;
    assignTask(_userId: string, taskId: string, input: AssignTaskInput): Promise<Task>;
    updateTaskTags(_userId: string, taskId: string, input: UpdateTagsInput): Promise<Task>;
}
export declare const taskService: TaskService;
//# sourceMappingURL=taskService.d.ts.map