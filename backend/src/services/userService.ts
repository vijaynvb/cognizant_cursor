import { userRepository } from '../repositories';
import type { UserListResponse } from '../dto';
import type { UserSummary } from '../dto/auth';

function toUserSummary(row: {
  id: string;
  email: string;
  displayName: string;
  role: string;
}): UserSummary {
  return {
    id: row.id,
    email: row.email,
    displayName: row.displayName,
    role: row.role as UserSummary['role'],
  };
}

export class UserService {
  async listUsers(
    _userId: string,
    params: { search?: string; page?: number; limit?: number }
  ): Promise<UserListResponse> {
    const { data, totalCount } = await userRepository.findMany({
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

export const userService = new UserService();
