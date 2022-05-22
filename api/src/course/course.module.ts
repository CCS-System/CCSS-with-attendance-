import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { StudentModule } from 'src/student/student.module';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CourseRepository]),
    forwardRef(() => DepartmentModule),
    forwardRef(() => StudentModule),
  ],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule { }
