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
    return await this.teacherRepository.find({ relations: ["department", "user"] });
  }

  async findAllByDepartment(id: string): Promise<Teacher[]> {
    return await this.teacherRepository.find({ where: { department: { id } }, relations: ["department", "user"] });
  }
  async findOneByUserId(id: string): Promise<Teacher> {
    return await this.teacherRepository.findOne({ where: { user: { id } }, relations: ["department", "user"] });
  }

  async findById(id: string): Promise<Teacher> {
    return await this.teacherRepository.findOne({ where: { id }, relations: ["department", "user"] });
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
