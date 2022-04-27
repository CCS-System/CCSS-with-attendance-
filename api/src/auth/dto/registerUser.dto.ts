import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ type: String })
  fullname: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

export type RegisterDto = Omit<RegisterUserDto, "role">;

export class RegisterTeacherDto extends RegisterUserDto {
  @ApiProperty({ type: String })
  department: string;
}