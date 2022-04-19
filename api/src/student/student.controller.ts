import { Controller, Get, NotFoundException, Param, Post, Put, Delete, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { SectionService } from 'src/section/section.service';
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
}

export class CreateStudentBulkDto {
  @ApiProperty({ type: Array })
  students: CreateStudentDto[]
}


@Controller('/api/students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly sectionService: SectionService
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

        const section = await this.sectionService.findById(payload.section);
        if (section) {
          await this.studentService.create({ ...payload, section })
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
