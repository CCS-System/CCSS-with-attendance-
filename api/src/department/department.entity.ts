import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { Section } from 'src/section/section.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Course } from 'src/course/course.entity';
import { Classroom } from 'src/classroom/classroom.entity';

@Entity({ name: 'department' })
export class Department {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Section, section => section.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  sections?: Section[];

  @ManyToMany(() => Teacher, teacher => teacher.departments, {cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }) @JoinTable({ name: "department_teacher" })
  teachers?: Teacher[];

  @OneToMany(() => Course, course => course.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  courses?: Course[];

  @OneToMany(() => Classroom, classroom => classroom.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  classrooms?: Classroom[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
