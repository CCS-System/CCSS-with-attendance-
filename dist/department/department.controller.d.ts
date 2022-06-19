import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/department.dto';
import { DepartmentService } from './department.service';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findAll(): Promise<Department[]>;
    findDepartmentByStudentId(departmentId: string): Promise<Department>;
    CreateDepartment(payload: CreateDepartmentDto): Promise<Department>;
    UpdateDepartment(departmentId: string, payload: CreateDepartmentDto): Promise<Department>;
    delete(departmentId: string): Promise<import("typeorm").DeleteResult>;
}
