import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
export declare type CoursePayload = Omit<Course, "createdAt" | "updatedAt">;
export declare class CourseService {
    private readonly courseRepository;
    constructor(courseRepository: CourseRepository);
    findAll(): Promise<Course[]>;
    findAllByDepartment(id: string): Promise<Course[]>;
    findById(id: string): Promise<Course>;
    create(course: CoursePayload): Promise<Course>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, course: CoursePayload): Promise<Course>;
}
