import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
    @ApiProperty({ type: String })
    schedule: string;
    @ApiProperty({ type: Date })
    date: string;
    @ApiProperty({ type: Array })
    students: { id: string; absent: boolean }[];

}