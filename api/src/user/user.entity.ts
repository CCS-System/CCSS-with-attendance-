import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
}

import { Teacher } from 'src/teacher/teacher.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  fullname: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.TEACHER,
  })
  role: UserRole;

  @OneToOne(() => Teacher, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  teacher?: Teacher;

  @Column({ name: "profile_picture", nullable: true })
  profilePicture?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ select: false })
  password: string;

  @Column({
    default: 0,
  })
  tokenVersion?: number;
}
