"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('Tasks API', () => {
    describe('GET /v1/tasks', () => {
        it('should return 401 without auth token', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get('/v1/tasks');
            expect(res.status).toBe(401);
        });
    });
    describe('POST /v1/tasks', () => {
        it('should return 401 without auth token', async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .post('/v1/tasks')
                .send({ title: 'Test task' });
            expect(res.status).toBe(401);
        });
    });
    // TODO: Add tests with valid JWT token
});
//# sourceMappingURL=tasks.test.js.map