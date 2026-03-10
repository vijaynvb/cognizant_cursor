import type { UserListResponse } from '../dto';
export declare class UserService {
    listUsers(_userId: string, params: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<UserListResponse>;
}
export declare const userService: UserService;
//# sourceMappingURL=userService.d.ts.map