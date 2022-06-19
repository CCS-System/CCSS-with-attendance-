import { Course } from './course.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> { }
