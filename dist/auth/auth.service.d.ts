import { OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AccessTokenPayload, RefreshTokenPayload } from './type/jwtPayload';
export declare class AuthService implements OnApplicationBootstrap {
    private readonly userService;
    constructor(userService: UserService);
    hashPassword(password: string): Promise<any>;
    onApplicationBootstrap(): Promise<void>;
    createAccessToken({ userId, role, fullname, email }: AccessTokenPayload): string;
    createRefreshToken({ userId, tokenVersion }: RefreshTokenPayload): string;
    assignTokens({ userId, role, email, fullname, tokenVersion }: AccessTokenPayload): {
        accessToken: string;
        refreshToken: string;
    };
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../user/type/userResponse").UserResponse;
    }>;
}
