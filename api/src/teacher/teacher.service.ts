import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';

export type TeacherPayload = Omit<Teacher, "createdAt" | "updatedAt">

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private readonly teacherRepository: TeacherRepository,
  ) { }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find({ relations: ["departments", "user"] });
  }

  async findAllByDepartment(id: string): Promise<Teacher[]> {
    const teachers = await this.teacherRepository.find({ relations: ["departments", "user"] });
    return teachers.filter(({ departments }) => {
      let found = false;
      for (const department of departments) {
        if (department.id === id) {
          found = true;
          break;
        }
      }
      return found;
    });
  }
  async findOneByUserId(id: string): Promise<Teacher> {
    return await this.teacherRepository.findOne({ where: { user: { id } }, relations: ["departments", "user"] });
  }

  async findById(id: string): Promise<Teacher> {
    return await this.teacherRepository.findOne({ where: { id }, relations: ["departments", "user"] });
  }

  async create(teacher: TeacherPayload): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create(teacher);
    return await this.teacherRepository.save(newTeacher);
  }

  async deleteById(id: string) {
    return await this.teacherRepository.delete({ id });
  }

  async updateById(id: string, teacher: TeacherPayload): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create({ ...teacher, id });
    return await this.teacherRepository.save(newTeacher);
  }
}
