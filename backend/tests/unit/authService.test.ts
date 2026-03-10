import { authService } from '../../src/services/authService';

describe('AuthService', () => {
  describe('login', () => {
    it('should return auth response for valid credentials', async () => {
      // TODO: Mock userRepository.findByEmail and bcrypt.compare
      expect(authService).toBeDefined();
    });

    it('should throw for invalid credentials', async () => {
      // TODO: Test invalid email/password
      expect(authService).toBeDefined();
    });
  });
});
