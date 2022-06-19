import { Student } from 'src/student/student.entity';
import { Department } from 'src/department/department.entity';
import { Schedule } from 'src/schedule/schedule.entity';
export declare class Section {
    id?: string;
    name: string;
    year: string;
    department: Department;
    students?: Student[];
    schedules?: Schedule[];
    createdAt: Date;
    updatedAt: Date;
}
