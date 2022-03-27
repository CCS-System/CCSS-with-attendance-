import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentRepository } from './department.repository';

export type DepartmentPayload = Omit<Department, "createdAt" | "updatedAt">

const departments = [
  { id: 'SITE', name: 'School of Information Technology and Engineering' },
  { id: 'SCEE', name: 'School of Civil & Enviromental Engineering' },
  { id: 'SECE', name: 'School of Electrical & Computer Engineering' },
  { id: 'SMIE', name: 'School of Mechanical and Industrial Engineering' },
  { id: 'SCBE', name: 'School of Chemical and Bio Engineering' },
  { id: 'SMDE', name: 'School of Multi-disciplinary Engineering' },

]

@Injectable()
export class DepartmentService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(DepartmentRepository)
    private readonly departmentRepository: DepartmentRepository,
  ) { }

  async onApplicationBootstrap(): Promise<void> {
    for (const department of departments) {
      try {
        await this.departmentRepository.save(this.departmentRepository.create(department));
      }
      catch (e) {
        console.log("DEPARTMENT: skipping seed");
      }
    }
  }



  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findById(id: string): Promise<Department> {
    return await this.departmentRepository.findOne({
      where: { id }, relations: ["sections"]
    });
  }

  async create(department: DepartmentPayload): Promise<Department> {
    const newDepartment = this.departmentRepository.create(department);
    return await this.departmentRepository.save(newDepartment);
  }

  async deleteById(id: string) {
    return await this.departmentRepository.delete({ id });
  }

  async updateById(id: string, department: DepartmentPayload): Promise<Department> {
    const newDepartment = this.departmentRepository.create({ ...department, id });
    return await this.departmentRepository.save(newDepartment);
  }

}
