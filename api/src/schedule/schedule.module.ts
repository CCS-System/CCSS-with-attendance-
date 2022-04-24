import { Module, forwardRef } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { TeacherModule } from 'src/teacher/teacher.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { SectionModule } from 'src/section/section.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, ScheduleRepository]),
    forwardRef(() => SectionModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => ClassroomModule),
    forwardRef(() => StudentModule),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule { }
