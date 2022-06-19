import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto, CreateScheduleBulkDto } from './dto/schedule.dto';
import { SectionService } from "src/section/section.service";
import { TeacherService } from "src/teacher/teacher.service";
import { ClassroomService } from "src/classroom/classroom.service";
import { StudentService } from 'src/student/student.service';
export declare class ScheduleController {
    private readonly scheduleService;
    private readonly sectionService;
    private readonly teacherService;
    private readonly classroomService;
    private readonly studentService;
    constructor(scheduleService: ScheduleService, sectionService: SectionService, teacherService: TeacherService, classroomService: ClassroomService, studentService: StudentService);
    findAll(): Promise<Schedule[]>;
    findAllById(id: string): Promise<Schedule>;
    findAllByIdAttendance(id: string): Promise<Schedule>;
    findAllBySection(id: string): Promise<Schedule[]>;
    findAllByTeacher(id: string): Promise<Schedule[]>;
    findAllByClassroom(id: string): Promise<Schedule[]>;
    CreateSchedule(payload: CreateScheduleDto): Promise<Schedule>;
    CreateReservedSchedule(payload: CreateScheduleDto): Promise<Schedule>;
    CreateScheduleBulk(bulk: CreateScheduleBulkDto): Promise<void>;
    GenerateSchedule(payload: any): Promise<any>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
