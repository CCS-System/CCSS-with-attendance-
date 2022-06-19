import { Department } from 'src/department/department.entity';
export declare class Course {
    id?: string;
    name: string;
    year: string;
    department: Department;
    createdAt: Date;
    updatedAt: Date;
}
