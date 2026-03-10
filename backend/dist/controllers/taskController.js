"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = exports.TaskController = void 0;
const services_1 = require("../services");
class TaskController {
    async listTasks(req, res, next) {
        try {
            const userId = req.user.userId;
            const { page, limit, status, priority, assigneeId, overdueOnly, tag, sort } = req.query;
            const result = await services_1.taskService.listTasks(userId, { status, priority, assigneeId, overdueOnly: overdueOnly === true, tag, sort }, { page: Number(page) || 1, limit: Number(limit) || 20 });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async createTask(req, res, next) {
        try {
            const userId = req.user.userId;
            const result = await services_1.taskService.createTask(userId, req.body);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getTask(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const result = await services_1.taskService.getTask(userId, taskId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async updateTask(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const result = await services_1.taskService.updateTask(userId, taskId, req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async patchTask(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const result = await services_1.taskService.patchTask(userId, taskId, req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            await services_1.taskService.deleteTask(userId, taskId);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
    async assignTask(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const result = await services_1.taskService.assignTask(userId, taskId, req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async updateTaskTags(req, res, next) {
        try {
            const userId = req.user.userId;
            const { taskId } = req.params;
            const result = await services_1.taskService.updateTaskTags(userId, taskId, req.body);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.TaskController = TaskController;
exports.taskController = new TaskController();
//# sourceMappingURL=taskController.js.map