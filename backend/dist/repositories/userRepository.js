"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const prisma_1 = require("./prisma");
class UserRepository {
    async findById(id) {
        return prisma_1.prisma.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
    }
    async findMany(params) {
        const { search, page = 1, limit = 20 } = params;
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { email: { contains: search, mode: 'insensitive' } },
                    { displayName: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [data, totalCount] = await Promise.all([
            prisma_1.prisma.user.findMany({
                where,
                skip,
                take: limit,
                select: {
                    id: true,
                    email: true,
                    displayName: true,
                    role: true,
                },
            }),
            prisma_1.prisma.user.count({ where }),
        ]);
        return { data, totalCount };
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=userRepository.js.map