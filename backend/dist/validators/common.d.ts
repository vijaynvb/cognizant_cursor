import { z } from 'zod';
export declare const paginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const taskListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
} & {
    status: z.ZodOptional<z.ZodEnum<["todo", "inProgress", "blocked", "completed"]>>;
    priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high", "critical"]>>;
    assigneeId: z.ZodOptional<z.ZodString>;
    overdueOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    tag: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<["dueDate", "createdAt", "priority", "status"]>>>;
}, "strip", z.ZodTypeAny, {
    sort: "createdAt" | "dueDate" | "priority" | "status";
    page: number;
    limit: number;
    overdueOnly: boolean;
    priority?: "low" | "medium" | "high" | "critical" | undefined;
    status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
    assigneeId?: string | undefined;
    tag?: string | undefined;
}, {
    sort?: "createdAt" | "dueDate" | "priority" | "status" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    priority?: "low" | "medium" | "high" | "critical" | undefined;
    status?: "completed" | "todo" | "inProgress" | "blocked" | undefined;
    assigneeId?: string | undefined;
    overdueOnly?: boolean | undefined;
    tag?: string | undefined;
}>;
export declare const taskIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        taskId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
    }, {
        taskId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        taskId: string;
    };
}, {
    params: {
        taskId: string;
    };
}>;
export declare const commentIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        taskId: z.ZodString;
        commentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        commentId: string;
    }, {
        taskId: string;
        commentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        taskId: string;
        commentId: string;
    };
}, {
    params: {
        taskId: string;
        commentId: string;
    };
}>;
export declare const notificationIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        notificationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        notificationId: string;
    }, {
        notificationId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        notificationId: string;
    };
}, {
    params: {
        notificationId: string;
    };
}>;
export declare const reportQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
} & {
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    assigneeId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    assigneeId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    assigneeId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const productivityReportQuerySchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    assigneeId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    assigneeId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    assigneeId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const userListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
} & {
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    search?: string | undefined;
}, {
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
//# sourceMappingURL=common.d.ts.map