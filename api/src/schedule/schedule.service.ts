import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';

export type SchedulePayload = Omit<Schedule, "createdAt" | "updatedAt">

export type SlotMatrix = Boolean[][]

export function createSlotMatrix(): SlotMatrix {
  const matrix = [];
  for (let index = 0; index < 6; index++) {
    matrix.push(Array(20).fill(false));

  }
  return matrix;
}

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleRepository)
    private readonly scheduleRepository: ScheduleRepository,
  ) { }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find({ relations: ["section", "section.department", "teacher", "teacher.department", "classroom", "students", "students.section", "students.section.department"] });
  }

  async findAllBySection(id: string): Promise<Schedule[]> {
    return await this.scheduleRepository.find({ where: { section: { id } }, relations: ["section", "section.department", "teacher", "teacher.department", "classroom", "students", "students.section", "students.section.department"] });
  }




  async findAllByClassroom(id: string): Promise<Schedule[]> {
    return await this.scheduleRepository.find({ where: { classroom: { id } }, relations: ["section", "section.department", "teacher", "teacher.department", "classroom", "students", "students.section", "students.section.department"] });
  }

  async findAllByTeacher(id: string): Promise<Schedule[]> {
    return await this.scheduleRepository.find({ where: { teacher: { id } }, relations: ["section", "section.department", "teacher", "teacher.department", "classroom", "students", "students.section", "students.section.department"] });
  }

  async findById(id: string): Promise<Schedule> {
    return await this.scheduleRepository.findOne({
      where: { id }, relations: ["section", "section.department", "teacher", "teacher.department", "classroom", "students", "students.section", "students.section.department", "students.attendance"]
    });
  }

  async create(schedule: SchedulePayload): Promise<Schedule> {
    const newSchedule = this.scheduleRepository.create(schedule);
    return await this.scheduleRepository.save(newSchedule);
  }

  async deleteById(id: string) {
    return await this.scheduleRepository.delete({ id });
  }

  async updateById(id: string, schedule: SchedulePayload): Promise<Schedule> {
    const newSchedule = this.scheduleRepository.create({ ...schedule, id });
    return await this.scheduleRepository.save(newSchedule);
  }

  async slotMatrixBy(val: string, id: string): Promise<SlotMatrix> {
    const schedules = (await this.scheduleRepository.find({ where: { [val]: { id } } })).map((props) => ({ ...props, slots: props.slots.split(",").map((s) => parseInt(s)) }));
    const matrix = createSlotMatrix();
    for (const s of schedules) {
      const weekday = s.weekday;
      for (const slot of s.slots) {
        matrix[weekday][slot] = true;
      }
    }
    return matrix;

  }

  async slotMatrixByYearAndSemester(val: string, id: string, year: string, semester: string): Promise<SlotMatrix> {
    const schedules = (await this.scheduleRepository.find({ where: { [val]: { id }, year, semester } })).map((props) => ({ ...props, slots: props.slots.split(",").map((s) => parseInt(s)) }));
    const matrix = createSlotMatrix();
    for (const s of schedules) {
      const weekday = s.weekday;
      for (const slot of s.slots) {
        matrix[weekday][slot] = true;
      }
    }
    return matrix;

  }

}
