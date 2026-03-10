"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../../src/services/authService");
describe('AuthService', () => {
    describe('login', () => {
        it('should return auth response for valid credentials', async () => {
            // TODO: Mock userRepository.findByEmail and bcrypt.compare
            expect(authService_1.authService).toBeDefined();
        });
        it('should throw for invalid credentials', async () => {
            // TODO: Test invalid email/password
            expect(authService_1.authService).toBeDefined();
        });
    });
});
//# sourceMappingURL=authService.test.js.map