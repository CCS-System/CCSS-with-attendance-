import { Attendance } from './attendance.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> { }
