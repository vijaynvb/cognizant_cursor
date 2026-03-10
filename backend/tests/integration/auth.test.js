"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('Auth API', () => {
    describe('POST /v1/auth/login', () => {
        it('should return 400 for missing body', async () => {
            const res = await (0, supertest_1.default)(app_1.default).post('/v1/auth/login').send({});
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('code');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('timestamp');
        });
        it('should return 400 for invalid email', async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .post('/v1/auth/login')
                .send({ email: 'invalid', password: 'test' });
            expect(res.status).toBe(400);
        });
        // TODO: Add test for successful login (requires seeded DB)
    });
});
//# sourceMappingURL=auth.test.js.map