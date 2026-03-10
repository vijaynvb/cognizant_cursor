/** Login request body. */
export interface LoginRequest {
    email: string;
    password: string;
}
/** SSO callback request body. */
export interface SsoCallbackRequest {
    token: string;
}
/** Refresh token request body. */
export interface RefreshTokenRequest {
    refreshToken: string;
}
/** User summary in auth response. */
export interface UserSummary {
    id: string;
    email: string;
    displayName: string;
    role: 'user' | 'manager' | 'admin';
}
/** Auth response with tokens and user. */
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: UserSummary;
}
//# sourceMappingURL=auth.d.ts.map