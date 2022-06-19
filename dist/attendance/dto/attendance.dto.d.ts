export declare class CreateAttendanceDto {
    schedule: string;
    date: string;
    students: {
        id: string;
        absent: boolean;
    }[];
}
