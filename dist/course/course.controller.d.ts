import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/course.dto';
import { DepartmentService } from 'src/department/department.service';
export declare class CourseController {
    private readonly courseService;
    private readonly departmentService;
    constructor(courseService: CourseService, departmentService: DepartmentService);
    findAll(): Promise<Course[]>;
    findCourseByStudentId(courseId: string): Promise<Course>;
    findCourseByDepartment(id: string): Promise<Course[]>;
    CreateCourse(payload: CreateCourseDto): Promise<Course>;
    UpdateDepartment(id: string, payload: CreateCourseDto): Promise<Course>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
