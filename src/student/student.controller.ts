import { Controller, Get, NotFoundException, Param, Post, Put, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { SectionService } from 'src/section/section.service';
import { DepartmentService } from 'src/department/department.service';
import { Student } from './student.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ type: String })
  studentId: string;
  @ApiProperty({ type: String })
  section: string;
  @ApiProperty({ type: String })
  fullname: string;
  @ApiProperty({ type: String })
  year: string;
}

export class CreateStudentBulkDto {
  @ApiProperty({ type: Array })
  students: CreateStudentDto[]
}


export class ImportStudentDto {
  @ApiProperty({ type: String })
  studentId: string;
  @ApiProperty({ type: String })
  section: string;
  @ApiProperty({ type: String })
  department: string;
  @ApiProperty({ type: String })
  fullname: string;
  @ApiProperty({ type: String })
  year: string;
}

export class ImportStudentBulkDto {
  @ApiProperty({ type: Array })
  students: ImportStudentDto[]
}


@Controller('/api/students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly sectionService: SectionService,
    private readonly departmentService: DepartmentService
  ) { }

  @Get()
  async findAll(): Promise<Student[]> {
    try {
      return await this.studentService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find students`);
    }
  }

  @Get(':id')
  async findStudentByStudentId(@Param('id') id: string): Promise<Student> {
    try {
      return await this.studentService.findById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find student`);
    }
  }

  @Get('section/:id')
  async findStudentsBySection(@Param('id') id: string): Promise<Student[]> {
    try {
      return await this.studentService.findAllBySection(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find student`);
    }
  }

  @Get('id/:studentId')
  async findStudentById(@Param('studentId') id: string): Promise<Student> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      return await this.studentService.findOneByStudentId(studentId);

    } catch (error) {
      throw new NotFoundException("Cannot find student");
    }
  }


  @Post()
  async CreateStudent(
    @Body() payload: CreateStudentDto,
  ) {
    try {
      const section = await this.sectionService.findById(payload.section);
      if (section) {
        return await this.studentService.create({ ...payload, section })
      }
      throw new NotFoundException("Section not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("bulk")
  async CreateScheduleBulk(
    @Body() bulk: CreateStudentBulkDto,
  ) {
    try {
      for (const payload of bulk.students) {
        try {
          const section = await this.sectionService.findById(payload.section);
          if (section) {
            await this.studentService.create({ ...payload, section })
          }
        }
        catch {
          continue;
        }

      }
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("import")
  async Import(
    @Body() bulk: ImportStudentBulkDto,
  ) {
    try {
      for (const payload of bulk.students) {
        try {
          const department = await this.departmentService.findLikeOrCreate(payload.department);
          const section = await this.sectionService.findLikeOrCreate(department.id, payload.section);
          await this.studentService.create({ ...payload, section });
        }
        catch(error) {
          console.log(error)
          continue;
        }

      }
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Put(':id')
  async UpdateDepartment(
    @Param('id') id: string,
    @Body() payload: CreateStudentDto,
  ) {
    try {
      const section = await this.sectionService.findById(payload.section);
      return await this.studentService.updateById(id, { ...payload, section })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.studentService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Cannot find department #${id}`);
    }
  }
}
