export declare enum UserRole {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER"
}
import { Teacher } from 'src/teacher/teacher.entity';
export declare class User {
    id?: string;
    fullname: string;
    email: string;
    role: UserRole;
    teacher?: Teacher;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
    password: string;
    tokenVersion?: number;
}
