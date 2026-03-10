import { prisma } from './prisma';

export interface ListUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findMany(params: ListUsersParams) {
    const { search, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { displayName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, totalCount] = await Promise.all([
      prisma.user.findMany({
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
      prisma.user.count({ where }),
    ]);

    return { data, totalCount };
  }
}

export const userRepository = new UserRepository();
