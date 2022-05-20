import { Controller, Get, NotFoundException, Param, Query, Post, Put, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SectionService } from './section.service';
import { Section } from './section.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateSectionDto } from './dto/section.dto';
import { DepartmentService } from 'src/department/department.service'
import { ScheduleService } from 'src/schedule/schedule.service';

@Controller('/api/sections')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly departmentService: DepartmentService,
    private readonly scheduleService: ScheduleService
  ) { }

  @Get()
  async findAll(): Promise<Section[]> {
    try {
      return await this.sectionService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find sections`);
    }
  }

  @Get("slot")
  async findAllSlot() {
    try {
      const response: Record<string, any>[] = []
      const entities = await this.sectionService.findAll();
      for (const entity of entities) {
        const slot = await this.scheduleService.slotMatrixBy("section", entity.id);
        response.push({ ...entity, slot })
      }
      return response;
    } catch (error) {
      throw new NotFoundException(`Cannot find entites`);
    }
  }

  @Get(':sectionId')
  async findSectionByStudentId(@Param('sectionId') sectionId: string): Promise<Section> {
    try {
      return await this.sectionService.findById(sectionId);
    } catch (error) {
      throw new NotFoundException(`Cannot find section #${sectionId}`);
    }
  }

  @Get('department-slot/:id')
  async findCourseByDepartmentSlot(@Param('id') id: string, @Query('year') year: string, @Query('semester') semester: string) {
    try {
      const response: Record<string, any>[] = []
      const list = await this.sectionService.findAllByDepartment(id);
      for (const l of list) {
        const slot = await this.scheduleService.slotMatrixByYearAndSemester("teacher", l.id, year, semester);
        response.push({ ...l, slot })
      }
      return response;
    } catch (error) {
      throw new NotFoundException(`Cannot find #${id}`);
    }
  }

  @Post()
  async CreateSection(
    @Body() payload: CreateSectionDto,
  ) {
    try {
      const department = await this.departmentService.findById(payload.department);
      if (department) {
        return await this.sectionService.create({ ...payload, department })
      }
      throw new NotFoundException("Department not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Put(':id')
  async UpdateDepartment(
    @Param('id') id: string,
    @Body() payload: CreateSectionDto,
  ) {
    try {
      const department = await this.departmentService.findById(payload.department);
      return await this.sectionService.updateById(id, { ...payload, department })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.sectionService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${id}`);
    }
  }
}
