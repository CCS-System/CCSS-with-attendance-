import { Student } from './student.entity';
import { StudentRepository } from './student.repository';
export declare type StudentPayload = Omit<Student, "createdAt" | "updatedAt">;
export declare class StudentService {
    private readonly studentRepository;
    constructor(studentRepository: StudentRepository);
    findAll(): Promise<Student[]>;
    findOneByStudentId(studentId: string): Promise<Student>;
    findAllByDepartment(id: string): Promise<Student[]>;
    findAllBySection(id: string): Promise<Student[]>;
    findById(id: string): Promise<Student>;
    create(student: StudentPayload): Promise<Student>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, student: StudentPayload): Promise<Student>;
}
