import { Attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';
export declare type AttendancePayload = Omit<Attendance, "createdAt" | "updatedAt">;
export declare class AttendanceService {
    private readonly attendanceRepository;
    constructor(attendanceRepository: AttendanceRepository);
    findAll(): Promise<Attendance[]>;
    findAllBySchedule(id: string): Promise<Attendance[]>;
    findAllByStudent(studentId: string): Promise<Attendance[]>;
    create(attendance: AttendancePayload): Promise<Attendance>;
}
