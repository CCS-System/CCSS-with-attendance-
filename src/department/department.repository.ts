import { Department } from './department.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> { }
