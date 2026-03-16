"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
// TODO: Implement refresh token storage (Redis or DB)
const refreshTokenStore = new Map();
function toUserSummary(id, email, displayName, role) {
    return { id, email, displayName, role: role };
}
class AuthService {
    async login(input) {
        const user = await repositories_1.userRepository.findByEmail(input.email);
        if (!user) {
            throw new errors_1.AppError('INVALID_CREDENTIALS', 'Invalid email or password', 400);
        }
        const valid = await bcrypt_1.default.compare(input.password, user.passwordHash);
        if (!valid) {
            throw new errors_1.AppError('INVALID_CREDENTIALS', 'Invalid email or password', 400);
        }
        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, {
            expiresIn: 3600,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, {
            expiresIn: 604800,
        });
        refreshTokenStore.set(refreshToken, payload);
        const expiresIn = 3600; // 1 hour in seconds
        return {
            accessToken,
            refreshToken,
            expiresIn,
            user: toUserSummary(user.id, user.email, user.displayName, user.role),
        };
    }
    async validateSsoToken(_input) {
        // TODO: Validate SSO token with provider, resolve user
        throw new errors_1.AppError('NOT_IMPLEMENTED', 'SSO callback not implemented', 501);
    }
    async refreshToken(input) {
        try {
            const payload = jsonwebtoken_1.default.verify(input.refreshToken, config_1.config.jwtSecret);
            const stored = refreshTokenStore.get(input.refreshToken);
            if (!stored) {
                throw new errors_1.AppError('INVALID_REFRESH_TOKEN', 'Invalid or expired refresh token', 401);
            }
            const user = await repositories_1.userRepository.findById(payload.userId);
            if (!user) {
                throw new errors_1.AppError('USER_NOT_FOUND', 'User no longer exists', 401);
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, config_1.config.jwtSecret, { expiresIn: 3600 });
            const expiresIn = 3600;
            return {
                accessToken,
                refreshToken: input.refreshToken,
                expiresIn,
                user: toUserSummary(user.id, user.email, user.displayName, user.role),
            };
        }
        catch (err) {
            if (err instanceof errors_1.AppError)
                throw err;
            throw new errors_1.AppError('INVALID_REFRESH_TOKEN', 'Invalid or expired refresh token', 401);
        }
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map