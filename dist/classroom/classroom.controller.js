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
exports.ClassroomController = void 0;
const common_1 = require("@nestjs/common");
const classroom_service_1 = require("./classroom.service");
const classroom_dto_1 = require("./dto/classroom.dto");
const department_service_1 = require("../department/department.service");
const schedule_service_1 = require("../schedule/schedule.service");
let ClassroomController = class ClassroomController {
    constructor(classroomService, departmentService, scheduleService) {
        this.classroomService = classroomService;
        this.departmentService = departmentService;
        this.scheduleService = scheduleService;
    }
    async findAll() {
        try {
            return await this.classroomService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find classrooms`);
        }
    }
    async findAllSlot() {
        try {
            const response = [];
            const entities = await this.classroomService.findAll();
            for (const entity of entities) {
                const slot = await this.scheduleService.slotMatrixBy("classroom", entity.id);
                response.push(Object.assign(Object.assign({}, entity), { slot }));
            }
            return response;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find entites`);
        }
    }
    async findCourseByDepartmentSlot(id, year, semester) {
        try {
            const response = [];
            const list = await this.classroomService.findAllByDepartment(id);
            for (const l of list) {
                const slot = await this.scheduleService.slotMatrixByYearAndSemester("teacher", l.id, year, semester);
                response.push(Object.assign(Object.assign({}, l), { slot }));
            }
            return response;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find #${id}`);
        }
    }
    async findClassroomByStudentId(classroomId) {
        try {
            return await this.classroomService.findById(classroomId);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find classroom #${classroomId}`);
        }
    }
    async CreateClassroom(payload) {
        try {
            const department = await this.departmentService.findById(payload.department);
            if (department) {
                return await this.classroomService.create(Object.assign(Object.assign({}, payload), { department }));
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
            return await this.classroomService.updateById(id, Object.assign(Object.assign({}, payload), { department }));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(id) {
        try {
            return await this.classroomService.deleteById(id);
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
], ClassroomController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("slot"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassroomController.prototype, "findAllSlot", null);
__decorate([
    (0, common_1.Get)('department-slot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('semester')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ClassroomController.prototype, "findCourseByDepartmentSlot", null);
__decorate([
    (0, common_1.Get)(':classroomId'),
    __param(0, (0, common_1.Param)('classroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassroomController.prototype, "findClassroomByStudentId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [classroom_dto_1.CreateClassroomDto]),
    __metadata("design:returntype", Promise)
], ClassroomController.prototype, "CreateClassroom", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, classroom_dto_1.CreateClassroomDto]),
    __metadata("design:returntype", Promise)
], ClassroomController.prototype, "UpdateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassroomController.prototype, "delete", null);
ClassroomController = __decorate([
    (0, common_1.Controller)('/api/classrooms'),
    __metadata("design:paramtypes", [classroom_service_1.ClassroomService,
        department_service_1.DepartmentService,
        schedule_service_1.ScheduleService])
], ClassroomController);
exports.ClassroomController = ClassroomController;
//# sourceMappingURL=classroom.controller.js.map