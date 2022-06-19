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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_dto_1 = require("./dto/course.dto");
const department_service_1 = require("../department/department.service");
let CourseController = class CourseController {
    constructor(courseService, departmentService) {
        this.courseService = courseService;
        this.departmentService = departmentService;
    }
    async findAll() {
        try {
            return await this.courseService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find courses`);
        }
    }
    async findCourseByStudentId(courseId) {
        try {
            return await this.courseService.findById(courseId);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find course #${courseId}`);
        }
    }
    async findCourseByDepartment(id) {
        try {
            return await this.courseService.findAllByDepartment(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find course #${id}`);
        }
    }
    async CreateCourse(payload) {
        try {
            const department = await this.departmentService.findById(payload.department);
            if (department) {
                return await this.courseService.create(Object.assign(Object.assign({}, payload), { department }));
            }
            throw new common_1.NotFoundException("Department not found");
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async UpdateDepartment(id, payload) {
        try {
            const department = await this.departmentService.findById(payload.department);
            return await this.courseService.updateById(id, Object.assign(Object.assign({}, payload), { department }));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(id) {
        try {
            return await this.courseService.deleteById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find department #${id}`);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findCourseByStudentId", null);
__decorate([
    (0, common_1.Get)('department/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findCourseByDepartment", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "CreateCourse", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "UpdateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
CourseController = __decorate([
    (0, common_1.Controller)('/api/courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        department_service_1.DepartmentService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map