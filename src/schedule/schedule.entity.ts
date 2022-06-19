import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';

import { Section } from 'src/section/section.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Classroom } from 'src/classroom/classroom.entity';
import { Student } from "src/student/student.entity";
import { Attendance } from 'src/attendance/attendance.entity';

@Entity({ name: 'schedule' })
export class Schedule {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  semester: string;

  @Column()
  year: string;

  @Column()
  weekday: number;

  @Column()
  slots: string;

  @Column({ nullable: true })
  date?: string;

  @Column({ default: false })
  reserved?: boolean;

  @Column({ default: false })
  makeup?: boolean;

  @ManyToOne(() => Section, section => section.schedules, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  section?: Section;

  @ManyToOne(() => Teacher, teacher => teacher.schedules, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  teacher: Teacher;

  @ManyToOne(() => Classroom, classroom => classroom.schedules, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  classroom?: Classroom;

  @ManyToMany(() => Student, student => student.schedules, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }) @JoinTable({ name: "enrollment" })
  students?: Student[];

  @OneToMany(() => Attendance, attendance => attendance.schedule, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  attendance?: Attendance[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
