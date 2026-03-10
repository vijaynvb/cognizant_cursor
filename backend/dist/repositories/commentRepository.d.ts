export interface ListCommentsParams {
    page?: number;
    limit?: number;
}
export declare class CommentRepository {
    findByTaskId(taskId: string, pagination?: ListCommentsParams): Promise<{
        data: ({
            author: {
                id: string;
                displayName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            taskId: string;
            authorId: string;
            content: string;
        })[];
        totalCount: number;
    }>;
    findById(id: string): Promise<({
        author: {
            id: string;
            displayName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        taskId: string;
        authorId: string;
        content: string;
    }) | null>;
    create(data: {
        taskId: string;
        authorId: string;
        content: string;
    }): Promise<{
        author: {
            id: string;
            displayName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        taskId: string;
        authorId: string;
        content: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        taskId: string;
        authorId: string;
        content: string;
    }>;
    deleteByTaskId(taskId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
export declare const commentRepository: CommentRepository;
//# sourceMappingURL=commentRepository.d.ts.map