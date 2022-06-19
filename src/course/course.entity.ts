import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';

import { Department } from 'src/department/department.entity';

@Entity({ name: 'course' })
export class Course {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({default:"2020"})
  year: string;

  @ManyToOne(() => Department, department => department.courses, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  department: Department;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
