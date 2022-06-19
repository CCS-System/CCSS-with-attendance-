import { Controller, Get, NotFoundException, Param, Post, Put, Query, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClassroomService } from './classroom.service';
import { Classroom } from './classroom.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateClassroomDto } from './dto/classroom.dto';
import { DepartmentService } from 'src/department/department.service'
import { ScheduleService } from 'src/schedule/schedule.service';

@Controller('/api/classrooms')
export class ClassroomController {
  constructor(
    private readonly classroomService: ClassroomService,
    private readonly departmentService: DepartmentService,
    private readonly scheduleService: ScheduleService
  ) { }

  @Get()
  async findAll(): Promise<Classroom[]> {
    try {
      return await this.classroomService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find classrooms`);
    }
  }

  @Get("slot")
  async findAllSlot() {
    try {
      const response: Record<string, any>[] = []
      const entities = await this.classroomService.findAll();
      for (const entity of entities) {
        const slot = await this.scheduleService.slotMatrixBy("classroom", entity.id);
        response.push({ ...entity, slot })
      }
      return response;
    } catch (error) {
      throw new NotFoundException(`Cannot find entites`);
    }
  }

  @Get('department-slot/:id')
  async findCourseByDepartmentSlot(@Param('id') id: string, @Query('year') year: string, @Query('semester') semester: string) {
    try {
      const response: Record<string, any>[] = []
      const list = await this.classroomService.findAllByDepartment(id);
      for (const l of list) {
        const slot = await this.scheduleService.slotMatrixByYearAndSemester("teacher", l.id, year, semester);
        response.push({ ...l, slot })
      }
      return response;
    } catch (error) {
      throw new NotFoundException(`Cannot find #${id}`);
    }
  }

  @Get(':classroomId')
  async findClassroomByStudentId(@Param('classroomId') classroomId: string): Promise<Classroom> {
    try {
      return await this.classroomService.findById(classroomId);
    } catch (error) {
      throw new NotFoundException(`Cannot find classroom #${classroomId}`);
    }
  }

  @Post()
  async CreateClassroom(
    @Body() payload: CreateClassroomDto,
  ) {
    try {
      const department = await this.departmentService.findById(payload.department);
      if (department) {
        return await this.classroomService.create({ ...payload, department })
      }
      throw new NotFoundException("Department not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Put(':id')
  async UpdateDepartment(
    @Param('id') id: string,
    @Body() payload: CreateClassroomDto,
  ) {
    try {
      const department = await this.departmentService.findById(payload.department);
      return await this.classroomService.updateById(id, { ...payload, department })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.classroomService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${id}`);
    }
  }
}
