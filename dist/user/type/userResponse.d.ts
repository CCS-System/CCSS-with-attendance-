import { User } from '../user.entity';
export declare type UserResponse = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;
