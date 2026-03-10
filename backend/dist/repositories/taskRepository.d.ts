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
export declare class TaskRepository {
    findById(id: string): Promise<({
        assignee: {
            id: string;
            email: string;
            displayName: string;
            role: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date | null;
        priority: string;
        status: string;
        title: string;
        description: string | null;
        assigneeId: string | null;
        tags: string[];
    }) | null>;
    findMany(filters: TaskFilters, pagination: PaginationParams): Promise<{
        data: ({
            assignee: {
                id: string;
                displayName: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dueDate: Date | null;
            priority: string;
            status: string;
            title: string;
            description: string | null;
            assigneeId: string | null;
            tags: string[];
        })[];
        totalCount: number;
    }>;
    create(data: {
        title: string;
        description?: string;
        priority: string;
        status: string;
        dueDate?: Date;
        assigneeId?: string;
        tags?: string[];
    }): Promise<{
        assignee: {
            id: string;
            displayName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date | null;
        priority: string;
        status: string;
        title: string;
        description: string | null;
        assigneeId: string | null;
        tags: string[];
    }>;
    update(id: string, data: Partial<{
        title: string;
        description: string;
        priority: string;
        status: string;
        dueDate: Date;
        assigneeId: string;
        tags: string[];
    }>): Promise<{
        assignee: {
            id: string;
            displayName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date | null;
        priority: string;
        status: string;
        title: string;
        description: string | null;
        assigneeId: string | null;
        tags: string[];
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date | null;
        priority: string;
        status: string;
        title: string;
        description: string | null;
        assigneeId: string | null;
        tags: string[];
    }>;
}
export declare const taskRepository: TaskRepository;
//# sourceMappingURL=taskRepository.d.ts.map