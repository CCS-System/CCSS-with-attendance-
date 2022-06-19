import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';
import { UserResponse } from './type/userResponse';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find products`);
    }
  }

  @Get(':id')

  async findUserById(@Param('id') userId: string): Promise<UserResponse> {
    try {
      return await this.userService.findOneById(userId);
    } catch (error) {
      throw new NotFoundException(`Cannot find user #${userId}`);
    }
  }
}
