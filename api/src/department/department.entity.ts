import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
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

  @OneToMany(() => Teacher, teacher => teacher.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
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
