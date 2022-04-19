import { Module, forwardRef } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { DepartmentModule } from 'src/department/department.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, TeacherRepository]),
    forwardRef(() => UserModule),
    forwardRef(() => DepartmentModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ScheduleModule),
  ],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule { }
