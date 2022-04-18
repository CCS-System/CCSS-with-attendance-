import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';

export type CoursePayload = Omit<Course, "createdAt" | "updatedAt">

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository,
  ) { }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ["department"] });
  }

  async findAllByDepartment(id: string): Promise<Course[]> {
    return await this.courseRepository.find({ where: { department: { id } }, relations: ["department"] });
  }

  async findById(id: string): Promise<Course> {
    return await this.courseRepository.findOne({
      where: { id }, relations: ["department"]
    });
  }

  async create(course: CoursePayload): Promise<Course> {
    const newCourse = this.courseRepository.create(course);
    return await this.courseRepository.save(newCourse);
  }

  async deleteById(id: string) {
    return await this.courseRepository.delete({ id });
  }

  async updateById(id: string, course: CoursePayload): Promise<Course> {
    const newCourse = this.courseRepository.create({ ...course, id });
    return await this.courseRepository.save(newCourse);
  }

}
