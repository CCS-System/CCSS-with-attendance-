import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    section: string;
    @ApiProperty({ type: String })
    year: string;
    @ApiProperty({ type: String })
    semester: string;
    @ApiProperty({ type: String })
    teacher: string;
    @ApiProperty({ type: String })
    classroom: string;
    @ApiProperty({ type: String })
    slots: string;
    @ApiProperty({ type: Number })
    weekday: number;
}

export class CreateScheduleBulkDto {
    @ApiProperty({ type: Array })
    schedules: CreateScheduleDto[]
}