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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const section_service_1 = require("./section.service");
const section_dto_1 = require("./dto/section.dto");
const department_service_1 = require("../department/department.service");
const schedule_service_1 = require("../schedule/schedule.service");
let SectionController = class SectionController {
    constructor(sectionService, departmentService, scheduleService) {
        this.sectionService = sectionService;
        this.departmentService = departmentService;
        this.scheduleService = scheduleService;
    }
    async findAll() {
        try {
            return await this.sectionService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find sections`);
        }
    }
    async findAllSlot() {
        try {
            const response = [];
            const entities = await this.sectionService.findAll();
            for (const entity of entities) {
                const slot = await this.scheduleService.slotMatrixBy("section", entity.id);
                response.push(Object.assign(Object.assign({}, entity), { slot }));
            }
            return response;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find entites`);
        }
    }
    async findSectionByStudentId(sectionId) {
        try {
            return await this.sectionService.findById(sectionId);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find section #${sectionId}`);
        }
    }
    async findCourseByDepartmentSlot(id, year, semester) {
        try {
            const response = [];
            const list = await this.sectionService.findAllByDepartment(id);
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
    async CreateSection(payload) {
        try {
            const department = await this.departmentService.findById(payload.department);
            if (department) {
                return await this.sectionService.create(Object.assign(Object.assign({}, payload), { department }));
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
            return await this.sectionService.updateById(id, Object.assign(Object.assign({}, payload), { department }));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(id) {
        try {
            return await this.sectionService.deleteById(id);
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
], SectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("slot"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "findAllSlot", null);
__decorate([
    (0, common_1.Get)(':sectionId'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "findSectionByStudentId", null);
__decorate([
    (0, common_1.Get)('department-slot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('semester')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "findCourseByDepartmentSlot", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "CreateSection", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "UpdateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "delete", null);
SectionController = __decorate([
    (0, common_1.Controller)('/api/sections'),
    __metadata("design:paramtypes", [section_service_1.SectionService,
        department_service_1.DepartmentService,
        schedule_service_1.ScheduleService])
], SectionController);
exports.SectionController = SectionController;
//# sourceMappingURL=section.controller.js.map