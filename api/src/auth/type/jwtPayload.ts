import { User, UserRole } from 'src/user/user.entity';

export interface AccessTokenPayload {
  userId: string;
  fullname: string;
  email: string;
  role: UserRole;
  tokenVersion?: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenVersion: number;
}
