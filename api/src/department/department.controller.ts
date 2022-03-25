import { Controller, Get, NotFoundException, Param, Post, Put, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Department } from './department.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateDepartmentDto } from './dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('/api/departments')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
  ) { }

  @Get()
  async findAll(): Promise<Department[]> {
    try {
      return await this.departmentService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find departments`);
    }
  }

  @Get(':departmentId')
  async findDepartmentByStudentId(@Param('departmentId') departmentId: string): Promise<Department> {
    try {
      return await this.departmentService.findById(departmentId);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${departmentId}`);
    }
  }

  @Post()
  async CreateDepartment(
    @Body() payload: CreateDepartmentDto,
  ) {
    try {

      return await this.departmentService.create({ ...payload })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Put(':departmentId')
  async UpdateDepartment(
    @Param('departmentId') departmentId: string,
    @Body() payload: CreateDepartmentDto,
  ) {
    try {

      return await this.departmentService.updateById(departmentId, { ...payload })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':departmentId')
  async delete(@Param('departmentId') departmentId: string) {
    try {
      return await this.departmentService.deleteById(departmentId);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${departmentId}`);
    }
  }
}
