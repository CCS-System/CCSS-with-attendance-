import { Schedule } from './schedule.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> { }
