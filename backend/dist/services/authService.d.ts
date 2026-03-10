import type { AuthResponse } from '../dto';
import type { LoginInput, SsoCallbackInput, RefreshTokenInput } from '../validators';
export declare class AuthService {
    login(input: LoginInput): Promise<AuthResponse>;
    validateSsoToken(_input: SsoCallbackInput): Promise<AuthResponse>;
    refreshToken(input: RefreshTokenInput): Promise<AuthResponse>;
}
export declare const authService: AuthService;
//# sourceMappingURL=authService.d.ts.map