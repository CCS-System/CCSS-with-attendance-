import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany
} from 'typeorm';

import { User } from 'src/user/user.entity';
import { Department } from 'src/department/department.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToMany(() => Department, department => department.teachers, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  departments: Department[];

  @OneToOne(() => User, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }) @JoinColumn()
  user: User;

  @OneToMany(() => Schedule, schedule => schedule.teacher, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  schedules?: Schedule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
