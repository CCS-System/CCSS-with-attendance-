import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Like } from "typeorm";
import { Section } from './section.entity';
import { SectionRepository } from './section.repository';
import { DepartmentService } from "src/department/department.service";

export type SectionPayload = Omit<Section, "createdAt" | "updatedAt">

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private readonly sectionRepository: SectionRepository,

    private readonly departmentService: DepartmentService,
  ) { }

  async findAll(): Promise<Section[]> {
    return await this.sectionRepository.find({ relations: ["department"] });
  }

  async findAllByDepartment(id: string): Promise<Section[]> {
    return await this.sectionRepository.find({ where: { department: { id } }, relations: ["department"] });
  }

  async findById(id: string): Promise<Section> {
    return await this.sectionRepository.findOne({
      where: { id }, relations: ["department"]
    });
  }

  async findLikeOrCreate(department: string, name: string): Promise<Section> {
    const result = await this.sectionRepository.findOne({
      where: { department: { id: department }, name: Like(`%${name}%`) }, relations: ["department"]
    });
    if (result) {
      return result;
    }
    else {
      const d = await this.departmentService.findById(department);
      return await this.create({ name, department: d, year: "2022" })
    }
  }

  async create(section: SectionPayload): Promise<Section> {
    const newSection = this.sectionRepository.create(section);
    return await this.sectionRepository.save(newSection);
  }

  async deleteById(id: string) {
    return await this.sectionRepository.delete({ id });
  }

  async updateById(id: string, section: SectionPayload): Promise<Section> {
    const newSection = this.sectionRepository.create({ ...section, id });
    return await this.sectionRepository.save(newSection);
  }

}
