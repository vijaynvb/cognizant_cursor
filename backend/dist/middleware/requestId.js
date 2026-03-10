"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
const crypto_1 = require("crypto");
/** Attaches a correlation/request ID to each request for tracing. */
function requestIdMiddleware(req, _res, next) {
    req.requestId = req.headers['x-request-id'] ?? (0, crypto_1.randomUUID)();
    next();
}
//# sourceMappingURL=requestId.js.map