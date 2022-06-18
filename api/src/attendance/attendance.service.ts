import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';

export type AttendancePayload = Omit<Attendance, "createdAt" | "updatedAt">

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRepository)
    private readonly attendanceRepository: AttendanceRepository,
  ) { }

  async findAll(): Promise<Attendance[]> {
    return await this.attendanceRepository.find();
  }

  async findAllBySchedule(id: string): Promise<Attendance[]> {
    return await this.attendanceRepository.find({ where: { schedule: { id } }, relations: ["schedule", "student", "student.section", "student.section.department"] });
  }

  async findAllByStudent(studentId: string): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { student: { studentId } },
    });
  }

  async create(attendance: AttendancePayload): Promise<Attendance> {
    const newAttendance = this.attendanceRepository.create(attendance);
    return await this.attendanceRepository.save(newAttendance);
  }

}
