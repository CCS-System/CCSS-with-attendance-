import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';
export declare type SchedulePayload = Omit<Schedule, "createdAt" | "updatedAt">;
export declare type SlotMatrix = Boolean[][];
export declare function createSlotMatrix(): SlotMatrix;
export declare class ScheduleService {
    private readonly scheduleRepository;
    constructor(scheduleRepository: ScheduleRepository);
    findAll(): Promise<Schedule[]>;
    findAllBySection(id: string): Promise<Schedule[]>;
    findAllByClassroom(id: string): Promise<Schedule[]>;
    findAllByTeacher(id: string): Promise<Schedule[]>;
    findById(id: string): Promise<Schedule>;
    findByIdAttendance(id: string): Promise<Schedule>;
    create(schedule: SchedulePayload): Promise<Schedule>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    updateById(id: string, schedule: SchedulePayload): Promise<Schedule>;
    slotMatrixBy(val: string, id: string): Promise<SlotMatrix>;
    slotMatrixByYearAndSemester(val: string, id: string, year: string, semester: string): Promise<SlotMatrix>;
    generate(e: Record<any, any>): Promise<any>;
}
