export interface ListUsersParams {
    search?: string;
    page?: number;
    limit?: number;
}
export declare class UserRepository {
    findById(id: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        displayName: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        displayName: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findMany(params: ListUsersParams): Promise<{
        data: {
            id: string;
            email: string;
            displayName: string;
            role: string;
        }[];
        totalCount: number;
    }>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=userRepository.d.ts.map