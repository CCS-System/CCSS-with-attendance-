import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Entity({ name: 'attendance' })
export class Attendance {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  date: string;

  @Column({ default: true })
  absent?: boolean;

  @ManyToOne(() => Student, student => student.attendance, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  student: Student;

  @ManyToOne(() => Schedule, schedule => schedule.attendance, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  schedule: Schedule;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
