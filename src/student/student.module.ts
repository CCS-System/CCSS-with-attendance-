import { Module, forwardRef } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { SectionModule } from "src/section/section.module";
import { DepartmentModule } from 'src/department/department.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentRepository]),
    forwardRef(() => SectionModule),
    forwardRef(() => DepartmentModule),
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule { }
