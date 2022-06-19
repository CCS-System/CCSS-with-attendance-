import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    department: string;
    @ApiProperty({ type: String })
    year: string;
}