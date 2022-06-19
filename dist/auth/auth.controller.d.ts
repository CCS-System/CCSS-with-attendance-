import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterTeacherDto } from './dto/registerUser.dto';
import { LoginResponse } from './type/loginResponse';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { DepartmentService } from 'src/department/department.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly teacherService;
    private readonly departmentService;
    constructor(authService: AuthService, userService: UserService, teacherService: TeacherService, departmentService: DepartmentService);
    hashPassword(password: string): Promise<any>;
    checkUserExists(email: string): Promise<boolean>;
    registerAdmin(registerDto: RegisterUserDto): Promise<LoginResponse>;
    registerTeacher(registerDto: RegisterTeacherDto): Promise<LoginResponse>;
    loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse>;
    getTokens(req: any): Promise<LoginResponse>;
}
