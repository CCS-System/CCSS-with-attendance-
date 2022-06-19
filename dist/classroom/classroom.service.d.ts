import { Classroom } from './classroom.entity';
import { ClassroomRepository } from './classroom.repository';
export declare type ClassroomPayload = Omit<Classroom, "createdAt" | "updatedAt">;
export declare class ClassroomService {
    private readonly classroomRepository;
    constructor(classroomRepository: ClassroomRepository);
    findAll(): Promise<Classroom[]>;
    findAllByDepartment(id: string): Promise<Classroom[]>;
    findById(id: string): Promise<Classroom>;
    create(classroom: ClassroomPayload): Promise<Classroom>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, classroom: ClassroomPayload): Promise<Classroom>;
}
