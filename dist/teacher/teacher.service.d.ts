import { Teacher } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';
export declare type TeacherPayload = Omit<Teacher, "createdAt" | "updatedAt">;
export declare class TeacherService {
    private readonly teacherRepository;
    constructor(teacherRepository: TeacherRepository);
    findAll(): Promise<Teacher[]>;
    findAllByDepartment(id: string): Promise<Teacher[]>;
    findOneByUserId(id: string): Promise<Teacher>;
    findById(id: string): Promise<Teacher>;
    create(teacher: TeacherPayload): Promise<Teacher>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, teacher: TeacherPayload): Promise<Teacher>;
}
