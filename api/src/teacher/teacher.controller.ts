import { Controller, Get, Post, Put, Delete, NotFoundException, Param, Query, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { DepartmentService } from 'src/department/department.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { LoginResponse } from "src/auth/type/loginResponse"
export class CreateTeacherDto {
  @ApiProperty({ type: String })
  fullname: string;
  @ApiProperty({ type: Array })
  departments: string[];
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

export class UpdateTeacherDto {
  @ApiProperty({ type: String })
  fullname: string;
  @ApiProperty({ type: String })
  departments: string[];
}

@Controller('/api/teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly departmentService: DepartmentService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly scheduleService: ScheduleService
  ) { }

  async hashPassword(password: string) {
    // Hash user password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }


  async checkUserExists(email: string): Promise<boolean> {
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }
    return false;
  }

  @Get()
  async findAll(): Promise<Teacher[]> {
    try {
      return await this.teacherService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find teachers`);
    }
  }

  @Get("slot")
  async findAllSlot() {
    try {
      const response: Record<string, any>[] = []
      const teachers = await this.teacherService.findAll();
      for (const teacher of teachers) {
        const slot = await this.scheduleService.slotMatrixBy("teacher", teacher.id);
        response.push({ ...teacher, slot })
      }
      return response;
    } catch (error) {
      throw new NotFoundException(`Cannot find teachers`);
    }
  }

  @Get(':id')
  async findTeacherById(@Param('id') id: string): Promise<Teacher> {
    try {
      return await this.teacherService.findById(id);

    } catch (error) {
      throw new NotFoundException("Cannot find teacher");
    }
  }

  @Get('department/:id')
  async findCourseByDepartment(@Param('id') id: string): Promise<Teacher[]> {
    try {
      return await this.teacherService.findAllByDepartment(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find teacher #${id}`);
    }
  }

  @Get('department-slot/:id')
  async findCourseByDepartmentSlot(@Param('id') id: string, @Query('year') year: string, @Query('semester') semester: string) {
    try {
      const response: Record<string, any>[] = []
      const list = await this.teacherService.findAllByDepartment(id);
      for (const l of list) {
        const slot = await this.scheduleService.slotMatrixByYearAndSemester("teacher", l.id, year, semester);
        response.push({ ...l, slot })
      }
      return response;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Cannot find #${id}`);
    }
  }

  @Post()
  async registerTeacher(
    @Body() registerDto: CreateTeacherDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.TEACHER,
        password: hashedPassword,
      });
      const departments = [];
      for (const deptId of registerDto.departments) {
        const department = await this.departmentService.findById(deptId);
        if (department) {
          departments.push(department)
        }
      }

      await this.teacherService.create({ ...registerDto, user, departments })
      const { id, role, email, fullname, tokenVersion, profilePicture } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, fullname, email, role, profilePicture, department: departments[0].name, id };
    } catch (error) {
      throw new BadRequestException('Failed to register user.', error);
    }
  }

  @Put(':id')
  async UpdateDepartment(
    @Param('id') id: string,
    @Body() payload: UpdateTeacherDto,
  ) {
    try {
      const departments = [];
      for (const deptId of payload.departments) {
        const department = await this.departmentService.findById(deptId);
        if (department) {
          departments.push(department)
        }
      }
      const user = (await this.teacherService.findById(id)).user;
      user.fullname = payload.fullname;
      return await this.teacherService.updateById(id, { ...payload, departments, user })

    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.teacherService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${id}`, error);
    }
  }
}
