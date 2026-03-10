import { Request, Response, NextFunction } from 'express';
export declare class CommentController {
    listComments(req: Request, res: Response, next: NextFunction): Promise<void>;
    addComment(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteComment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const commentController: CommentController;
//# sourceMappingURL=commentController.d.ts.map