"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const registerUser_dto_1 = require("./dto/registerUser.dto");
const bcrypt = require("bcryptjs");
const loginUser_dto_1 = require("./dto/loginUser.dto");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const teacher_service_1 = require("../teacher/teacher.service");
const cookie_interceptor_1 = require("./interceptor/cookie.interceptor");
const department_service_1 = require("../department/department.service");
let AuthController = class AuthController {
    constructor(authService, userService, teacherService, departmentService) {
        this.authService = authService;
        this.userService = userService;
        this.teacherService = teacherService;
        this.departmentService = departmentService;
    }
    async hashPassword(password) {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    async checkUserExists(email) {
        const existingUser = await this.userService.findOneByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists.');
        }
        return false;
    }
    async registerAdmin(registerDto) {
        const { email, password } = registerDto;
        await this.checkUserExists(email);
        try {
            const hashedPassword = await this.hashPassword(password);
            const user = await this.userService.create(Object.assign(Object.assign({}, registerDto), { role: user_entity_1.UserRole.ADMIN, password: hashedPassword }));
            const { id, role, email, fullname, profilePicture, tokenVersion } = user;
            const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
            return Object.assign(Object.assign({}, tokens), { email, fullname, role, profilePicture, id });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to register user.');
        }
    }
    async registerTeacher(registerDto) {
        const { email, password } = registerDto;
        await this.checkUserExists(email);
        try {
            const hashedPassword = await this.hashPassword(password);
            const user = await this.userService.create(Object.assign(Object.assign({}, registerDto), { role: user_entity_1.UserRole.TEACHER, password: hashedPassword }));
            const departments = [];
            for (const deptId of registerDto.departments) {
                const department = await this.departmentService.findById(deptId);
                if (department) {
                    departments.push(department);
                }
            }
            await this.teacherService.create(Object.assign(Object.assign({}, registerDto), { user, departments }));
            const { id, role, email, fullname, tokenVersion, profilePicture } = user;
            const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
            return Object.assign(Object.assign({}, tokens), { fullname, email, role, profilePicture, department: departments[0].name, id: id || "" });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to register user.');
        }
    }
    async loginUser(loginUserDto) {
        const { email: loginEmail, password: loginPassword } = loginUserDto;
        let existingUser;
        let isValid;
        try {
            existingUser = await this.userService.findUserWithPassword(loginEmail);
            isValid = await bcrypt.compare(loginPassword, existingUser.password);
        }
        catch (error) {
            throw new common_1.ForbiddenException('Username or password is invalid');
        }
        if (!isValid) {
            throw new common_1.ForbiddenException('Username or password is invalid');
        }
        const { id, role, profilePicture, tokenVersion, email, fullname } = existingUser;
        let department = "";
        let teacherId = id;
        switch (role) {
            case "TEACHER":
                const { id: id1 } = await this.teacherService.findOneByUserId(id);
                teacherId = id1;
                break;
        }
        const tokens = this.authService.assignTokens({ userId: id, email, fullname, role, tokenVersion });
        const response = Object.assign(Object.assign({}, tokens), { fullname, email, role, profilePicture, department, id: teacherId });
        return response;
    }
    async getTokens(req) {
        const token = req.cookies['refreshToken'];
        try {
            const { accessToken, refreshToken, user, } = await this.authService.refreshTokens(token);
            if (accessToken && user) {
                return Object.assign(Object.assign({ accessToken, refreshToken }, user), { id: user.id });
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException(error.message);
        }
    }
};
__decorate([
    (0, common_1.Post)('register/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('register/teacher'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterTeacherDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerTeacher", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getTokens", null);
AuthController = __decorate([
    (0, common_1.UseInterceptors)(cookie_interceptor_1.CookieInterceptor),
    (0, common_1.Controller)('/api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        teacher_service_1.TeacherService,
        department_service_1.DepartmentService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map