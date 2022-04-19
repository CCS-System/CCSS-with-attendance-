import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { Attendance } from 'src/attendance/attendance.entity';
import { Section } from 'src/section/section.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  studentId: string;

  @Column({})
  fullname: string;

  @ManyToOne(() => Section, section => section.students, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  section: Section;

  @OneToMany(() => Attendance, attendance => attendance.student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  attendance?: Attendance[];

  @ManyToMany(() => Schedule, schedule => schedule.students, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  schedules?: Schedule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
