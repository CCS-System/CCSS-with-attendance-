import { OnApplicationBootstrap } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentRepository } from './department.repository';
export declare type DepartmentPayload = Omit<Department, "createdAt" | "updatedAt">;
export declare class DepartmentService implements OnApplicationBootstrap {
    private readonly departmentRepository;
    constructor(departmentRepository: DepartmentRepository);
    onApplicationBootstrap(): Promise<void>;
    findAll(): Promise<Department[]>;
    findById(id: string): Promise<Department>;
    findLikeOrCreate(id: string): Promise<Department>;
    create(department: DepartmentPayload): Promise<Department>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, department: DepartmentPayload): Promise<Department>;
}
