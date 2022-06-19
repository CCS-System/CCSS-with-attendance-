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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const department_dto_1 = require("./dto/department.dto");
const department_service_1 = require("./department.service");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async findAll() {
        try {
            return await this.departmentService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find departments`);
        }
    }
    async findDepartmentByStudentId(departmentId) {
        try {
            return await this.departmentService.findById(departmentId);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find department #${departmentId}`);
        }
    }
    async CreateDepartment(payload) {
        try {
            return await this.departmentService.create(Object.assign({}, payload));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async UpdateDepartment(departmentId, payload) {
        try {
            return await this.departmentService.updateById(departmentId, Object.assign({}, payload));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(departmentId) {
        try {
            return await this.departmentService.deleteById(departmentId);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find department #${departmentId}`);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':departmentId'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findDepartmentByStudentId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "CreateDepartment", null);
__decorate([
    (0, common_1.Put)(':departmentId'),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "UpdateDepartment", null);
__decorate([
    (0, common_1.Delete)(':departmentId'),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "delete", null);
DepartmentController = __decorate([
    (0, common_1.Controller)('/api/departments'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map