import { z } from 'zod';
export declare const createCommentSchema: z.ZodObject<{
    body: z.ZodObject<{
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        content: string;
    }, {
        content: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        content: string;
    };
}, {
    body: {
        content: string;
    };
}>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>['body'];
//# sourceMappingURL=comment.d.ts.map