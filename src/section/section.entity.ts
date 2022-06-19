import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';
import { Department } from 'src/department/department.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Entity({ name: 'section' })
export class Section {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  year: string;

  @ManyToOne(() => Department, department => department.sections, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  department: Department;

  @OneToMany(() => Student, student => student.section, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  students?: Student[];

  @OneToMany(() => Schedule, schedule => schedule.section, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  schedules?: Schedule[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
