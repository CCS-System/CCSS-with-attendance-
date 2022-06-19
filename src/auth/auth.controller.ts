import {
  Controller,
  Post,
  Req,
  Body,
  Logger,
  BadRequestException,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterTeacherDto } from './dto/registerUser.dto';
import { LoginResponse } from './type/loginResponse';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/loginUser.dto';
import { User, UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { CookieInterceptor } from './interceptor/cookie.interceptor';
import { DepartmentService } from 'src/department/department.service';

@UseInterceptors(CookieInterceptor)
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly teacherService: TeacherService,
    private readonly departmentService: DepartmentService
  ) {
  }

  async hashPassword(password: string) {
    // Hash user password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }


  async checkUserExists(email: string): Promise<boolean> {
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }
    return false;
  }

  @Post('register/admin')
  async registerAdmin(
    @Body() registerDto: RegisterUserDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.ADMIN,
        password: hashedPassword,
      });
      const { id, role, email, fullname, profilePicture, tokenVersion } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, email, fullname, role, profilePicture, id };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }



  @Post('register/teacher')
  async registerTeacher(
    @Body() registerDto: RegisterTeacherDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.TEACHER,
        password: hashedPassword,
      });
      const departments = [];
      for (const deptId of registerDto.departments) {
        const department = await this.departmentService.findById(deptId);
        if (department) {
          departments.push(department)
        }

      }

      await this.teacherService.create({ ...registerDto, user, departments })
      const { id, role, email, fullname, tokenVersion, profilePicture } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, fullname, email, role, profilePicture, department: departments[0].name, id: id || "" };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const { email: loginEmail, password: loginPassword } = loginUserDto;
    let existingUser: Omit<User, 'createdAt' | 'updatedAt'>;
    let isValid: boolean;

    try {
      existingUser = await this.userService.findUserWithPassword(loginEmail);
      isValid = await bcrypt.compare(loginPassword, existingUser.password);
    } catch (error) {
      throw new ForbiddenException('Username or password is invalid');
    }

    if (!isValid) {
      throw new ForbiddenException('Username or password is invalid');
    }

    const { id, role, profilePicture, tokenVersion, email, fullname } = existingUser;
    let department = "";
    let teacherId = id;
    switch (role) {
      case "TEACHER":
        const { id:id1 } = await this.teacherService.findOneByUserId(id);
        teacherId = id1;
        break;
    }
    const tokens = this.authService.assignTokens({ userId: id, email, fullname, role, tokenVersion });
    const response = { ...tokens, fullname, email, role, profilePicture, department, id: teacherId };
    return response;
  }

  @Post('refresh-token')
  async getTokens(@Req() req): Promise<LoginResponse> {
    const token = req.cookies['refreshToken'];

    try {
      const {
        accessToken,
        refreshToken,
        user,
      } = await this.authService.refreshTokens(token);
      if (accessToken && user) {
        return { accessToken, refreshToken, ...user, id: user.id };
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
