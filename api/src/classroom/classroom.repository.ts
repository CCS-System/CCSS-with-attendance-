import { Classroom } from './classroom.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Classroom)
export class ClassroomRepository extends Repository<Classroom> { }
