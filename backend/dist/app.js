"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errors_1 = require("./errors");
const requestId_1 = require("./middleware/requestId");
const swagger_1 = require("./swagger");
const authRoutes_1 = require("./routes/authRoutes");
const taskRoutes_1 = require("./routes/taskRoutes");
const commentRoutes_1 = require("./routes/commentRoutes");
const notificationRoutes_1 = require("./routes/notificationRoutes");
const reportRoutes_1 = require("./routes/reportRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(requestId_1.requestIdMiddleware);
app.use((0, morgan_1.default)('combined'));
(0, swagger_1.setupSwagger)(app);
app.use('/v1/auth', authRoutes_1.authRoutes);
app.use('/v1/tasks', commentRoutes_1.commentRoutes);
app.use('/v1/tasks', taskRoutes_1.taskRoutes);
app.use('/v1/notifications', notificationRoutes_1.notificationRoutes);
app.use('/v1/reports', reportRoutes_1.reportRoutes);
app.use('/v1/users', userRoutes_1.userRoutes);
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use(errors_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map