import { Department } from 'src/department/department.entity';
import { Schedule } from 'src/schedule/schedule.entity';
export declare class Classroom {
    id?: string;
    name: string;
    capacity: number;
    type: string;
    department: Department;
    schedules?: Schedule[];
    createdAt: Date;
    updatedAt: Date;
}
