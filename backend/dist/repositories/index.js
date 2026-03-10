"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepository = exports.commentRepository = exports.taskRepository = exports.userRepository = exports.prisma = void 0;
var prisma_1 = require("./prisma");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return prisma_1.prisma; } });
var userRepository_1 = require("./userRepository");
Object.defineProperty(exports, "userRepository", { enumerable: true, get: function () { return userRepository_1.userRepository; } });
var taskRepository_1 = require("./taskRepository");
Object.defineProperty(exports, "taskRepository", { enumerable: true, get: function () { return taskRepository_1.taskRepository; } });
var commentRepository_1 = require("./commentRepository");
Object.defineProperty(exports, "commentRepository", { enumerable: true, get: function () { return commentRepository_1.commentRepository; } });
var notificationRepository_1 = require("./notificationRepository");
Object.defineProperty(exports, "notificationRepository", { enumerable: true, get: function () { return notificationRepository_1.notificationRepository; } });
//# sourceMappingURL=index.js.map