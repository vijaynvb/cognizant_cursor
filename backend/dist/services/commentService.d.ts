import type { Comment, CommentListResponse } from '../dto';
import type { CreateCommentInput } from '../validators';
export declare class CommentService {
    listComments(_userId: string, taskId: string, pagination: {
        page: number;
        limit: number;
    }): Promise<CommentListResponse>;
    addComment(userId: string, taskId: string, input: CreateCommentInput): Promise<Comment>;
    deleteComment(userId: string, taskId: string, commentId: string): Promise<void>;
}
export declare const commentService: CommentService;
//# sourceMappingURL=commentService.d.ts.map