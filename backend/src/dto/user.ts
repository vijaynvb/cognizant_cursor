import type { UserSummary } from './auth';
import type { Pagination } from './common';

/** User with timestamps. */
export interface User extends UserSummary {
  createdAt: string;
  updatedAt: string;
}

/** Paginated user list response. */
export interface UserListResponse {
  data: UserSummary[];
  pagination: Pagination;
}
