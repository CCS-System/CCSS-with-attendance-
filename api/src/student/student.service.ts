import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

export type StudentPayload = Omit<Student, "createdAt" | "updatedAt">

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
  ) { }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({ relations: ["attendance", "section", "section.department","attendance.schedule"] });
  }

  async findOneByStudentId(studentId: string): Promise<Student> {
    return await this.studentRepository.findOne({
      where: { studentId }, relations: ["attendance", "section", "section.department","attendance.schedule"]
    });
  }

  async findAllByDepartment(id: string): Promise<Student[]> {
    return await this.studentRepository.find({ where: { section: { department: { id } } }, relations: ["attendance", "section", "section.department","attendance.schedule"] });
  }


  async findAllBySection(id: string): Promise<Student[]> {
    return await this.studentRepository.find({ where: { section: { id } }, relations: ["attendance", "section", "section.department","attendance.schedule"] });
  }


  async findById(id: string): Promise<Student> {
    return await this.studentRepository.findOne({
      where: { id }, relations: ["attendance", "section", "section.department","attendance.schedule"]
    });
  }

  async create(student: StudentPayload): Promise<Student> {
    const newStudent = this.studentRepository.create(student);
    return await this.studentRepository.save(newStudent);
  }

  async deleteById(id: string) {
    return await this.studentRepository.delete({ id });
  }

  async updateById(id: string, student: StudentPayload): Promise<Student> {
    const newStudent = this.studentRepository.create({ ...student, id });
    return await this.studentRepository.save(newStudent);
  }
}
