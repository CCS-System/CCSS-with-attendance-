import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { UserRepository } from './user.repository';
import { UserResponse } from './type/userResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return await this.userRepository.find({ role });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findOneByTeacherId(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { teacher: { id } }, relations: ["teacher"]
    });
  }

  async deleteByTeacherId(id: string) {
    return await this.userRepository.delete({
      teacher: { id }
    });
  }

  async findUserWithPassword(email: string): Promise<User> {
    return await this.userRepository.findOne({
      select: [
        'id',
        'fullname',
        'email',
        'role',
        'tokenVersion',
        'password',
      ],
      where: { email },
    });
  }

  async findOneById(id: string): Promise<UserResponse> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
