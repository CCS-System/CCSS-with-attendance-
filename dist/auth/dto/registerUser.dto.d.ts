export declare class RegisterUserDto {
    fullname: string;
    email: string;
    password: string;
}
export declare type RegisterDto = Omit<RegisterUserDto, "role">;
export declare class RegisterTeacherDto extends RegisterUserDto {
    departments: string[];
}
