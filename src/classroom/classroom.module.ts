import { Module, forwardRef } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { ClassroomRepository } from './classroom.repository';
import { StudentModule } from 'src/student/student.module';
import { DepartmentModule } from 'src/department/department.module';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, ClassroomRepository]),
    forwardRef(() => DepartmentModule),
    forwardRef(() => ScheduleModule),
    forwardRef(() => StudentModule),
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController],
  exports: [ClassroomService],
})
export class ClassroomModule { }
