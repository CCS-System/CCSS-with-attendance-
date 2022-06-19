import { UserService } from './user.service';
import { User } from './user.entity';
import { UserResponse } from './type/userResponse';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findUserById(userId: string): Promise<UserResponse>;
}
