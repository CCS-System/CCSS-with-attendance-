import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    department: string;
    @ApiProperty({ type: Number })
    capacity: number;
    @ApiProperty({ type: String })
    type: string;
}