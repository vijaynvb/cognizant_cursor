import { z } from 'zod';
export declare const createTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodDefault<z.ZodOptional<z.ZodEnum<["low", "medium", "high", "critical"]>>>;
        status: z.ZodDefault<z.ZodOptional<z.ZodEnum<["todo", "inProgress", "blocked", "completed"]>>>;
        dueDate: z.ZodOptional<z.ZodString>;
        assigneeId: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        priority: "low" | "medium" | "high" | "critical";
        status: "completed" | "todo" | "inProgress" | "blocked";
        title: string;
        dueDate?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    }, {
        title: string;
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        priority: "low" | "medium" | "high" | "critical";
        status: "completed" | "todo" | "inProgress" | "blocked";
        title: string;
        dueDate?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    };
}, {
    body: {
        title: string;
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    };
}>;
export declare const updateTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodDefault<z.ZodOptional<z.ZodEnum<["low", "medium", "high", "critical"]>>>;
        status: z.ZodDefault<z.ZodOptional<z.ZodEnum<["todo", "inProgress", "blocked", "completed"]>>>;
        dueDate: z.ZodOptional<z.ZodString>;
        assigneeId: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        priority: "low" | "medium" | "high" | "critical";
        status: "completed" | "todo" | "inProgress" | "blocked";
        title: string;
        dueDate?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    }, {
        title: string;
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        priority: "low" | "medium" | "high" | "critical";
        status: "completed" | "todo" | "inProgress" | "blocked";
        title: string;
        dueDate?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    };
}, {
    body: {
        title: string;
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    };
}>;
export declare const patchTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high", "critical"]>>;
        status: z.ZodOptional<z.ZodEnum<["todo", "inProgress", "blocked", "completed"]>>;
        dueDate: z.ZodOptional<z.ZodString>;
        assigneeId: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        title?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    }, {
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        title?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        title?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    };
}, {
    body: {
        dueDate?: string | undefined;
        priority?: "low" | "medium" | "high" | "critical" | undefined;
        status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
        title?: string | undefined;
        description?: string | undefined;
        assigneeId?: string | undefined;
        tags?: string[] | undefined;
    };
}>;
export declare const assignTaskSchema: z.ZodObject<{
    body: z.ZodObject<{
        assigneeId: z.ZodString;
        note: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        assigneeId: string;
        note?: string | undefined;
    }, {
        assigneeId: string;
        note?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        assigneeId: string;
        note?: string | undefined;
    };
}, {
    body: {
        assigneeId: string;
        note?: string | undefined;
    };
}>;
export declare const updateTagsSchema: z.ZodObject<{
    body: z.ZodObject<{
        tags: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
    }, {
        tags: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        tags: string[];
    };
}, {
    body: {
        tags: string[];
    };
}>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>['body'];
export type PatchTaskInput = z.infer<typeof patchTaskSchema>['body'];
export type AssignTaskInput = z.infer<typeof assignTaskSchema>['body'];
export type UpdateTagsInput = z.infer<typeof updateTagsSchema>['body'];
//# sourceMappingURL=task.d.ts.map