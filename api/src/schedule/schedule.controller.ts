import { Controller, Get, NotFoundException, Param, Post, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateScheduleDto, CreateScheduleBulkDto } from './dto/schedule.dto';
import { SectionService } from "src/section/section.service";
import { TeacherService } from "src/teacher/teacher.service";
import { ClassroomService } from "src/classroom/classroom.service";
import { StudentService } from 'src/student/student.service';

@Controller('/api/schedules')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly sectionService: SectionService,
    private readonly teacherService: TeacherService,
    private readonly classroomService: ClassroomService,
    private readonly studentService: StudentService
  ) { }

  @Get()
  async findAll(): Promise<Schedule[]> {
    try {
      return await this.scheduleService.findAll();
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Cannot find schedules`, error);
    }
  }

  @Get(":id")
  async findAllById(@Param('id') id: string): Promise<Schedule> {
    try {
      return await this.scheduleService.findById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find schedule`);
    }
  }

  @Get("section/:id")
  async findAllBySection(@Param('id') id: string): Promise<Schedule[]> {
    try {
      return await this.scheduleService.findAllBySection(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find schedules`);
    }
  }

  @Get("teacher/:id")
  async findAllByTeacher(@Param('id') id: string): Promise<Schedule[]> {
    try {
      return await this.scheduleService.findAllByTeacher(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find schedules`);
    }
  }


  @Get("classroom/:id")
  async findAllByClassroom(@Param('id') id: string): Promise<Schedule[]> {
    try {
      return await this.scheduleService.findAllByClassroom(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find schedules`);
    }
  }

  @Get(':scheduleId')
  async findScheduleByStudentId(@Param('scheduleId') scheduleId: string): Promise<Schedule> {
    try {
      return await this.scheduleService.findById(scheduleId);
    } catch (error) {
      throw new NotFoundException(`Cannot find schedule #${scheduleId}`);
    }
  }

  @Post()
  async CreateSchedule(
    @Body() payload: CreateScheduleDto,
  ) {
    try {
      const section = await this.sectionService.findById(payload.section);
      const teacher = await this.teacherService.findById(payload.teacher);
      const classroom = await this.classroomService.findById(payload.classroom);
      const students = await this.studentService.findAllBySection(section.id);
      if (section && teacher && classroom) {
        return await this.scheduleService.create({ ...payload, section, teacher, classroom, students })
      }
      throw new NotFoundException("Entity not found");

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post("bulk")
  async CreateScheduleBulk(
    @Body() bulk: CreateScheduleBulkDto,
  ) {
    try {
      for (const payload of bulk.schedules) {

        const section = await this.sectionService.findById(payload.section);
        const teacher = await this.teacherService.findById(payload.teacher);
        const classroom = await this.classroomService.findById(payload.classroom);
        const students = await this.studentService.findAllBySection(section.id);
        if (section && teacher && classroom) {
          await this.scheduleService.create({ ...payload, section, teacher, classroom, students })
        }
        else {
          throw new NotFoundException("Entity not found");
        }



      }
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.scheduleService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find schedule #${id}`, error);
    }
  }
}
