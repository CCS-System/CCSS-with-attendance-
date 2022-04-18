import { Controller, Get, NotFoundException, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { StudentService } from 'src/student/student.service';
import { ScheduleService } from 'src/schedule/schedule.service';

@Controller('/api/attendances')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly studentService: StudentService,
    private readonly scheduleService: ScheduleService
  ) { }

  @Get()
  async findAll(): Promise<Attendance[]> {
    try {
      return await this.attendanceService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find attendances`);
    }
  }

  @Get("schedule/:id")
  async findAllSchedule(@Param('id') id: string): Promise<Attendance[]> {
    try {
      return await this.attendanceService.findAllBySchedule(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find attendances`);
    }
  }

  @Get('student/:studentId')
  async findAttendanceByStudentId(@Param('studentId') studentId: string): Promise<Attendance[]> {
    try {
      return await this.attendanceService.findAllByStudent(studentId);
    } catch (error) {
      throw new NotFoundException(`Cannot find attendance #${studentId}`);
    }
  }

  @Post()
  async CreateAttendance(
    @Body() payload: CreateAttendanceDto,
  ) {
    try {
      const schedule = await this.scheduleService.findById(payload.schedule);
      for (const s of payload.students) {
        const student = await this.studentService.findById(s.id);
        if (student) {
          await this.attendanceService.create({ date: payload.date, absent: s.absent, student, schedule })
        } else {
          throw new NotFoundException("Student not found");
        }

      }
    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
