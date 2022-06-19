import { Attendance } from 'src/attendance/attendance.entity';
import { Section } from 'src/section/section.entity';
import { Schedule } from 'src/schedule/schedule.entity';
export declare class Student {
    id?: string;
    studentId: string;
    fullname: string;
    year: string;
    section: Section;
    attendance?: Attendance[];
    schedules?: Schedule[];
    createdAt?: Date;
    updatedAt?: Date;
}
