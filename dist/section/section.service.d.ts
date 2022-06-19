import { Section } from './section.entity';
import { SectionRepository } from './section.repository';
import { DepartmentService } from "src/department/department.service";
export declare type SectionPayload = Omit<Section, "createdAt" | "updatedAt">;
export declare class SectionService {
    private readonly sectionRepository;
    private readonly departmentService;
    constructor(sectionRepository: SectionRepository, departmentService: DepartmentService);
    findAll(): Promise<Section[]>;
    findAllByDepartment(id: string): Promise<Section[]>;
    findById(id: string): Promise<Section>;
    findLikeOrCreate(department: string, name: string): Promise<Section>;
    create(section: SectionPayload): Promise<Section>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, section: SectionPayload): Promise<Section>;
}
