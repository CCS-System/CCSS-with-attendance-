import { ClassroomService } from './classroom.service';
import { Classroom } from './classroom.entity';
import { CreateClassroomDto } from './dto/classroom.dto';
import { DepartmentService } from 'src/department/department.service';
import { ScheduleService } from 'src/schedule/schedule.service';
export declare class ClassroomController {
    private readonly classroomService;
    private readonly departmentService;
    private readonly scheduleService;
    constructor(classroomService: ClassroomService, departmentService: DepartmentService, scheduleService: ScheduleService);
    findAll(): Promise<Classroom[]>;
    findAllSlot(): Promise<Record<string, any>[]>;
    findCourseByDepartmentSlot(id: string, year: string, semester: string): Promise<Record<string, any>[]>;
    findClassroomByStudentId(classroomId: string): Promise<Classroom>;
    CreateClassroom(payload: CreateClassroomDto): Promise<Classroom>;
    UpdateDepartment(id: string, payload: CreateClassroomDto): Promise<Classroom>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
