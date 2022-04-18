import { Module, forwardRef } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';;
import { StudentModule } from 'src/student/student.module';
import { ScheduleModule } from 'src/schedule/schedule.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, AttendanceRepository]),
    forwardRef(() => StudentModule),
    forwardRef(() => ScheduleModule),

  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
  exports: [AttendanceService],
})
export class AttendanceModule { }
