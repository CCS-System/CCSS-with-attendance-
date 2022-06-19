import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { ClassroomRepository } from './classroom.repository';

export type ClassroomPayload = Omit<Classroom, "createdAt" | "updatedAt">

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(ClassroomRepository)
    private readonly classroomRepository: ClassroomRepository,
  ) { }

  async findAll(): Promise<Classroom[]> {
    return await this.classroomRepository.find({ relations: ["department"] });
  }

  async findAllByDepartment(id: string): Promise<Classroom[]> {
    return await this.classroomRepository.find({ where: { department: { id } }, relations: ["department"] });
  }

  async findById(id: string): Promise<Classroom> {
    return await this.classroomRepository.findOne({
      where: { id }, relations: ["department"]
    });
  }

  async create(classroom: ClassroomPayload): Promise<Classroom> {
    const newClassroom = this.classroomRepository.create(classroom);
    return await this.classroomRepository.save(newClassroom);
  }

  async deleteById(id: string) {
    return await this.classroomRepository.delete({ id });
  }

  async updateById(id: string, classroom: ClassroomPayload): Promise<Classroom> {
    const newClassroom = this.classroomRepository.create({ ...classroom, id });
    return await this.classroomRepository.save(newClassroom);
  }

}
