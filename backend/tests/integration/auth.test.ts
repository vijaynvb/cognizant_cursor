import request from 'supertest';
import app from '../../src/app';

describe('Auth API', () => {
  describe('POST /v1/auth/login', () => {
    it('should return 400 for missing body', async () => {
      const res = await request(app).post('/v1/auth/login').send({});
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('code');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('timestamp');
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/v1/auth/login')
        .send({ email: 'invalid', password: 'test' });
      expect(res.status).toBe(400);
    });

    // TODO: Add test for successful login (requires seeded DB)
  });
});
