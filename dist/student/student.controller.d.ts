import { StudentService } from './student.service';
import { SectionService } from 'src/section/section.service';
import { DepartmentService } from 'src/department/department.service';
import { Student } from './student.entity';
export declare class CreateStudentDto {
    studentId: string;
    section: string;
    fullname: string;
    year: string;
}
export declare class CreateStudentBulkDto {
    students: CreateStudentDto[];
}
export declare class ImportStudentDto {
    studentId: string;
    section: string;
    department: string;
    fullname: string;
    year: string;
}
export declare class ImportStudentBulkDto {
    students: ImportStudentDto[];
}
export declare class StudentController {
    private readonly studentService;
    private readonly sectionService;
    private readonly departmentService;
    constructor(studentService: StudentService, sectionService: SectionService, departmentService: DepartmentService);
    findAll(): Promise<Student[]>;
    findStudentByStudentId(id: string): Promise<Student>;
    findStudentsBySection(id: string): Promise<Student[]>;
    findStudentById(id: string): Promise<Student>;
    CreateStudent(payload: CreateStudentDto): Promise<Student>;
    CreateScheduleBulk(bulk: CreateStudentBulkDto): Promise<void>;
    Import(bulk: ImportStudentBulkDto): Promise<void>;
    UpdateDepartment(id: string, payload: CreateStudentDto): Promise<Student>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
