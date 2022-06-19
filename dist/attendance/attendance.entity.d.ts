import { Student } from 'src/student/student.entity';
import { Schedule } from 'src/schedule/schedule.entity';
export declare class Attendance {
    id?: string;
    date: string;
    absent?: boolean;
    student: Student;
    schedule: Schedule;
    createdAt: Date;
    updatedAt: Date;
}
