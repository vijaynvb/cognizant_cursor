"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const repositories_1 = require("../repositories");
function toUserSummary(row) {
    return {
        id: row.id,
        email: row.email,
        displayName: row.displayName,
        role: row.role,
    };
}
class UserService {
    async listUsers(_userId, params) {
        const { data, totalCount } = await repositories_1.userRepository.findMany({
            search: params.search,
            page: params.page ?? 1,
            limit: params.limit ?? 20,
        });
        const limit = params.limit ?? 20;
        const totalPages = Math.ceil(totalCount / limit);
        return {
            data: data.map(toUserSummary),
            pagination: {
                page: params.page ?? 1,
                limit,
                totalCount,
                totalPages,
            },
        };
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map