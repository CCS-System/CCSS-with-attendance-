import { User, UserRole } from './user.entity';
import { UserRepository } from './user.repository';
import { UserResponse } from './type/userResponse';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findAll(): Promise<User[]>;
    findByRole(role: UserRole): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    findOneByTeacherId(id: string): Promise<User>;
    deleteByTeacherId(id: string): Promise<import("typeorm").DeleteResult>;
    findUserWithPassword(email: string): Promise<User>;
    findOneById(id: string): Promise<UserResponse>;
    create(user: User): Promise<User>;
    updateById(id: string, user: User): Promise<User>;
}
