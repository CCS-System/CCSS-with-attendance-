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
exports.TeacherController = exports.UpdateTeacherDto = exports.CreateTeacherDto = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("./teacher.service");
const user_entity_1 = require("../user/user.entity");
const department_service_1 = require("../department/department.service");
const schedule_service_1 = require("../schedule/schedule.service");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = require("bcryptjs");
class CreateTeacherDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], CreateTeacherDto.prototype, "departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "password", void 0);
exports.CreateTeacherDto = CreateTeacherDto;
class UpdateTeacherDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", Array)
], UpdateTeacherDto.prototype, "departments", void 0);
exports.UpdateTeacherDto = UpdateTeacherDto;
let TeacherController = class TeacherController {
    constructor(teacherService, departmentService, userService, authService, scheduleService) {
        this.teacherService = teacherService;
        this.departmentService = departmentService;
        this.userService = userService;
        this.authService = authService;
        this.scheduleService = scheduleService;
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
    async findAll() {
        try {
            return await this.teacherService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find teachers`);
        }
    }
    async findAllSlot() {
        try {
            const response = [];
            const teachers = await this.teacherService.findAll();
            for (const teacher of teachers) {
                const slot = await this.scheduleService.slotMatrixBy("teacher", teacher.id);
                response.push(Object.assign(Object.assign({}, teacher), { slot }));
            }
            return response;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find teachers`);
        }
    }
    async findTeacherById(id) {
        try {
            return await this.teacherService.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException("Cannot find teacher");
        }
    }
    async findCourseByDepartment(id) {
        try {
            return await this.teacherService.findAllByDepartment(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find teacher #${id}`);
        }
    }
    async findCourseByDepartmentSlot(id, year, semester) {
        try {
            const response = [];
            const list = await this.teacherService.findAllByDepartment(id);
            for (const l of list) {
                const slot = await this.scheduleService.slotMatrixByYearAndSemester("teacher", l.id, year, semester);
                response.push(Object.assign(Object.assign({}, l), { slot }));
            }
            return response;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException(`Cannot find #${id}`);
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
            return Object.assign(Object.assign({}, tokens), { fullname, email, role, profilePicture, department: departments[0].name, id });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to register user.', error);
        }
    }
    async UpdateDepartment(id, payload) {
        try {
            const departments = [];
            for (const deptId of payload.departments) {
                const department = await this.departmentService.findById(deptId);
                if (department) {
                    departments.push(department);
                }
            }
            let user = (await this.teacherService.findById(id)).user;
            user.fullname = payload.fullname;
            user = await this.userService.updateById(user.id, user);
            return await this.teacherService.updateById(id, Object.assign(Object.assign({}, payload), { departments, user }));
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(id) {
        try {
            return await this.teacherService.deleteById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find department #${id}`, error);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("slot"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findAllSlot", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findTeacherById", null);
__decorate([
    (0, common_1.Get)('department/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findCourseByDepartment", null);
__decorate([
    (0, common_1.Get)('department-slot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('semester')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findCourseByDepartmentSlot", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "registerTeacher", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "UpdateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "delete", null);
TeacherController = __decorate([
    (0, common_1.Controller)('/api/teachers'),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService,
        department_service_1.DepartmentService,
        user_service_1.UserService,
        auth_service_1.AuthService,
        schedule_service_1.ScheduleService])
], TeacherController);
exports.TeacherController = TeacherController;
//# sourceMappingURL=teacher.controller.js.map