import { SectionService } from './section.service';
import { Section } from './section.entity';
import { CreateSectionDto } from './dto/section.dto';
import { DepartmentService } from 'src/department/department.service';
import { ScheduleService } from 'src/schedule/schedule.service';
export declare class SectionController {
    private readonly sectionService;
    private readonly departmentService;
    private readonly scheduleService;
    constructor(sectionService: SectionService, departmentService: DepartmentService, scheduleService: ScheduleService);
    findAll(): Promise<Section[]>;
    findAllSlot(): Promise<Record<string, any>[]>;
    findSectionByStudentId(sectionId: string): Promise<Section>;
    findCourseByDepartmentSlot(id: string, year: string, semester: string): Promise<Record<string, any>[]>;
    CreateSection(payload: CreateSectionDto): Promise<Section>;
    UpdateDepartment(id: string, payload: CreateSectionDto): Promise<Section>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
