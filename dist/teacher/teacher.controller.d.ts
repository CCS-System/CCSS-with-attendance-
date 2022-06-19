import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { DepartmentService } from 'src/department/department.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from "src/auth/type/loginResponse";
export declare class CreateTeacherDto {
    fullname: string;
    departments: string[];
    email: string;
    password: string;
}
export declare class UpdateTeacherDto {
    fullname: string;
    departments: string[];
}
export declare class TeacherController {
    private readonly teacherService;
    private readonly departmentService;
    private readonly userService;
    private readonly authService;
    private readonly scheduleService;
    constructor(teacherService: TeacherService, departmentService: DepartmentService, userService: UserService, authService: AuthService, scheduleService: ScheduleService);
    hashPassword(password: string): Promise<any>;
    checkUserExists(email: string): Promise<boolean>;
    findAll(): Promise<Teacher[]>;
    findAllSlot(): Promise<Record<string, any>[]>;
    findTeacherById(id: string): Promise<Teacher>;
    findCourseByDepartment(id: string): Promise<Teacher[]>;
    findCourseByDepartmentSlot(id: string, year: string, semester: string): Promise<Record<string, any>[]>;
    registerTeacher(registerDto: CreateTeacherDto): Promise<LoginResponse>;
    UpdateDepartment(id: string, payload: UpdateTeacherDto): Promise<Teacher>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
