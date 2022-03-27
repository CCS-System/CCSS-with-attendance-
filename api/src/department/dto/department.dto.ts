import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @ApiProperty({ type: String })
    id: string; 
   @ApiProperty({ type: String })
    name: string;
}