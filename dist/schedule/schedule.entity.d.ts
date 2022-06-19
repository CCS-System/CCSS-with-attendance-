import { Section } from 'src/section/section.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Classroom } from 'src/classroom/classroom.entity';
import { Student } from "src/student/student.entity";
import { Attendance } from 'src/attendance/attendance.entity';
export declare class Schedule {
    id?: string;
    name: string;
    semester: string;
    year: string;
    weekday: number;
    slots: string;
    date?: string;
    reserved?: boolean;
    makeup?: boolean;
    section?: Section;
    teacher: Teacher;
    classroom?: Classroom;
    students?: Student[];
    attendance?: Attendance[];
    createdAt: Date;
    updatedAt: Date;
}
