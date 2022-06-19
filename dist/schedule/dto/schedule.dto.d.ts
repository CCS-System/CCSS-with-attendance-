export declare class CreateScheduleDto {
    name: string;
    section?: string;
    year: string;
    semester: string;
    teacher?: string;
    classroom?: string;
    slots: string;
    weekday: number;
    date?: string;
    makeup?: boolean;
    reserved?: boolean;
}
export declare class CreateScheduleBulkDto {
    schedules: CreateScheduleDto[];
}
