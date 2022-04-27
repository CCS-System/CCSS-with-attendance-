import { Teacher } from './teacher.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> { }
