import request from 'supertest';
import app from '../../src/app';

describe('Tasks API', () => {
  describe('GET /v1/tasks', () => {
    it('should return 401 without auth token', async () => {
      const res = await request(app).get('/v1/tasks');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /v1/tasks', () => {
    it('should return 401 without auth token', async () => {
      const res = await request(app)
        .post('/v1/tasks')
        .send({ title: 'Test task' });
      expect(res.status).toBe(401);
    });
  });

  // TODO: Add tests with valid JWT token
});
