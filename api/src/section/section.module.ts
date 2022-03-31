import { Module, forwardRef } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionRepository } from './section.repository';
import { StudentModule } from 'src/student/student.module';
import { DepartmentModule } from 'src/department/department.module';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, SectionRepository]),
    forwardRef(() => DepartmentModule),
    forwardRef(() => StudentModule),
    forwardRef(() => ScheduleModule),
  ],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService],
})
export class SectionModule { }
