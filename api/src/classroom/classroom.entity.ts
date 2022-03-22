import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { Department } from 'src/department/department.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Entity({ name: 'classroom' })
export class Classroom {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  type: string;

  @ManyToOne(() => Department, department => department.classrooms, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  department: Department;

  @OneToMany(() => Schedule, schedule => schedule.classroom, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  schedules?: Schedule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
