import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { StudentService } from 'src/student/student.service';
import { ScheduleService } from 'src/schedule/schedule.service';
export declare class AttendanceController {
    private readonly attendanceService;
    private readonly studentService;
    private readonly scheduleService;
    constructor(attendanceService: AttendanceService, studentService: StudentService, scheduleService: ScheduleService);
    findAll(): Promise<Attendance[]>;
    findAllSchedule(id: string): Promise<Attendance[]>;
    findAttendanceByStudentId(studentId: string): Promise<Attendance[]>;
    CreateAttendance(payload: CreateAttendanceDto): Promise<void>;
}
