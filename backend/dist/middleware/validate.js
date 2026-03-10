"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.validateRequest = validateRequest;
const errors_1 = require("../errors");
/**
 * Creates validation middleware for request body, query, or params.
 * Validates at the edge and returns 400 with OpenAPI error shape on failure.
 */
function validate(schema, target = 'body') {
    return (req, _res, next) => {
        const data = req[target];
        const result = schema.safeParse(data);
        if (result.success) {
            req[target] = result.data;
            next();
            return;
        }
        const zodError = result.error;
        const details = zodError.errors.map((e) => ({
            field: e.path.join('.') || undefined,
            message: e.message,
        }));
        next(new errors_1.ValidationError('Validation failed', details));
    };
}
/**
 * Validates a schema that has nested body/query/params.
 * Use for schemas like: z.object({ body: z.object({...}), params: z.object({...}) })
 */
function validateRequest(schema) {
    return (req, _res, next) => {
        const data = { body: req.body, query: req.query, params: req.params };
        const result = schema.safeParse(data);
        if (result.success) {
            const data = result.data;
            if (data.body !== undefined)
                req.body = data.body;
            if (data.query !== undefined)
                req.query = data.query;
            if (data.params !== undefined)
                req.params = data.params;
            next();
            return;
        }
        const zodError = result.error;
        const details = zodError.errors.map((e) => ({
            field: e.path.join('.') || undefined,
            message: e.message,
        }));
        next(new errors_1.ValidationError('Validation failed', details));
    };
}
//# sourceMappingURL=validate.js.map