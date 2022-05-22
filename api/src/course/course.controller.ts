import { Controller, Get, NotFoundException, Param, Post, Put, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateCourseDto } from './dto/course.dto';
import { DepartmentService } from 'src/department/department.service'

@Controller('/api/courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly departmentService: DepartmentService,
  ) { }

  @Get()
  async findAll(): Promise<Course[]> {
    try {
      return await this.courseService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find courses`);
    }
  }

  @Get(':courseId')
  async findCourseByStudentId(@Param('courseId') courseId: string): Promise<Course> {
    try {
      return await this.courseService.findById(courseId);
    } catch (error) {
      throw new NotFoundException(`Cannot find course #${courseId}`);
    }
  }

  @Get('department/:id')
  async findCourseByDepartment(@Param('id') id: string): Promise<Course[]> {
    try {
      return await this.courseService.findAllByDepartment(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find course #${id}`);
    }
  }

  @Post()
  async CreateCourse(
    @Body() payload: CreateCourseDto,
  ) {
    try {
      const department = await this.departmentService.findById(payload.department);
      if (department) {
        return await this.courseService.create({ ...payload, department })
      }
      throw new NotFoundException("Department not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Put(':id')
  async UpdateDepartment(
    @Param('id') id: string,
    @Body() payload: CreateCourseDto,
  ) {
    try {
      const department = await this.departmentService.findById(payload.department);
      return await this.courseService.updateById(id, { ...payload, department })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.courseService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${id}`);
    }
  }
}
