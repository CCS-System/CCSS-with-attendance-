import { User } from 'src/user/user.entity';
import { Department } from 'src/department/department.entity';
import { Schedule } from 'src/schedule/schedule.entity';
export declare class Teacher {
    id?: string;
    departments: Department[];
    user: User;
    schedules?: Schedule[];
    createdAt?: Date;
    updatedAt?: Date;
}
