import { taskService } from '../../src/services/taskService';

describe('TaskService', () => {
  describe('listTasks', () => {
    it('should return paginated task list', async () => {
      // TODO: Mock taskRepository.findMany
      expect(taskService).toBeDefined();
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      // TODO: Mock taskRepository.create, userRepository.findById
      expect(taskService).toBeDefined();
    });
  });

  describe('getTask', () => {
    it('should throw NotFoundError when task does not exist', async () => {
      // TODO: Mock taskRepository.findById to return null
      expect(taskService).toBeDefined();
    });
  });
});
