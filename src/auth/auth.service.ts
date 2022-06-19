import { Injectable, ForbiddenException, OnApplicationBootstrap } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { AccessTokenPayload, RefreshTokenPayload } from './type/jwtPayload';
import { UserRole } from '../user/user.entity';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) { }

  async hashPassword(password: string) {
    // Hash user password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async onApplicationBootstrap(): Promise<void> {
    try {
      const hashedPassword = await this.hashPassword("12345678");
      await this.userService.create({
        fullname: "Admin",
        email: "admin@demo.com",
        role: UserRole.ADMIN,
        password: hashedPassword,
      });
      console.log("admin created");
    }
    catch (e) {
      console.log("ADMIN: skipping seed");
    }
  }

  createAccessToken({ userId, role, fullname, email }: AccessTokenPayload): string {
    return sign({ userId, role, fullname, email }, process.env.ACCESS_TOKEN_SECRET || "1234567890", {
      expiresIn: '15m',
    });
  }

  createRefreshToken({ userId, tokenVersion }: RefreshTokenPayload): string {
    return sign({ userId, tokenVersion }, process.env.REFRESH_TOKEN_SECRET || "1234567890", {
      expiresIn: '7d',
    });
  }

  assignTokens({ userId, role, email, fullname, tokenVersion }: AccessTokenPayload) {
    return {
      accessToken: this.createAccessToken({ userId, role, email, fullname }),
      refreshToken: this.createRefreshToken({ userId, tokenVersion }),
    };
  }

  /** If refresh token is not expired, re-assign new access token and refresh token */
  async refreshTokens(refreshToken: string) {
    // let decodedRefreshToken: RefreshTokenPayload;
    // let user: UserResponse;

    const decodedRefreshToken = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "1234567890",
    );
    const user = await this.userService.findOneById(decodedRefreshToken.userId);

    // If user is not found or the refresh token version doesn't match, throw error
    if (!user || user.tokenVersion !== decodedRefreshToken.tokenVersion) {
      throw new Error('Please register or sign in.');
    }

    const { id, role, email, fullname, tokenVersion } = user;

    const tokens = await this.assignTokens({ userId: id, role, email, fullname, tokenVersion });
    return {
      user,
      ...tokens,
    };
  }
}
