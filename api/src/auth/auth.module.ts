import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TeacherModule } from "../teacher/teacher.module";
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => DepartmentModule),

  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
