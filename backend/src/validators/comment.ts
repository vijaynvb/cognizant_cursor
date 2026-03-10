import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Content is required').max(2000),
  }),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>['body'];
