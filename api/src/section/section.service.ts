import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionRepository } from './section.repository';

export type SectionPayload = Omit<Section, "createdAt" | "updatedAt">

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private readonly sectionRepository: SectionRepository,
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
