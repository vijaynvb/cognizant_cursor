"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskService_1 = require("../../src/services/taskService");
describe('TaskService', () => {
    describe('listTasks', () => {
        it('should return paginated task list', async () => {
            // TODO: Mock taskRepository.findMany
            expect(taskService_1.taskService).toBeDefined();
        });
    });
    describe('createTask', () => {
        it('should create a task', async () => {
            // TODO: Mock taskRepository.create, userRepository.findById
            expect(taskService_1.taskService).toBeDefined();
        });
    });
    describe('getTask', () => {
        it('should throw NotFoundError when task does not exist', async () => {
            // TODO: Mock taskRepository.findById to return null
            expect(taskService_1.taskService).toBeDefined();
        });
    });
});
//# sourceMappingURL=taskService.test.js.map