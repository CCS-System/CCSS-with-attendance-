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
exports.StudentController = exports.ImportStudentBulkDto = exports.ImportStudentDto = exports.CreateStudentBulkDto = exports.CreateStudentDto = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const section_service_1 = require("../section/section.service");
const department_service_1 = require("../department/department.service");
const swagger_1 = require("@nestjs/swagger");
class CreateStudentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "year", void 0);
exports.CreateStudentDto = CreateStudentDto;
class CreateStudentBulkDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], CreateStudentBulkDto.prototype, "students", void 0);
exports.CreateStudentBulkDto = CreateStudentBulkDto;
class ImportStudentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ImportStudentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ImportStudentDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ImportStudentDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ImportStudentDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ImportStudentDto.prototype, "year", void 0);
exports.ImportStudentDto = ImportStudentDto;
class ImportStudentBulkDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], ImportStudentBulkDto.prototype, "students", void 0);
exports.ImportStudentBulkDto = ImportStudentBulkDto;
let StudentController = class StudentController {
    constructor(studentService, sectionService, departmentService) {
        this.studentService = studentService;
        this.sectionService = sectionService;
        this.departmentService = departmentService;
    }
    async findAll() {
        try {
            return await this.studentService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find students`);
        }
    }
    async findStudentByStudentId(id) {
        try {
            return await this.studentService.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find student`);
        }
    }
    async findStudentsBySection(id) {
        try {
            return await this.studentService.findAllBySection(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find student`);
        }
    }
    async findStudentById(id) {
        try {
            const studentId = Buffer.from(id, "base64").toString();
            return await this.studentService.findOneByStudentId(studentId);
        }
        catch (error) {
            throw new common_1.NotFoundException("Cannot find student");
        }
    }
    async CreateStudent(payload) {
        try {
            const section = await this.sectionService.findById(payload.section);
            if (section) {
                return await this.studentService.create(Object.assign(Object.assign({}, payload), { section }));
            }
            throw new common_1.NotFoundException("Section not found");
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async CreateScheduleBulk(bulk) {
        try {
            for (const payload of bulk.students) {
                try {
                    const section = await this.sectionService.findById(payload.section);
                    if (section) {
                        await this.studentService.create(Object.assign(Object.assign({}, payload), { section }));
                    }
                }
                catch (_a) {
                    continue;
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async Import(bulk) {
        try {
            for (const payload of bulk.students) {
                try {
                    const department = await this.departmentService.findLikeOrCreate(payload.department);
                    const section = await this.sectionService.findLikeOrCreate(department.id, payload.section);
                    await this.studentService.create(Object.assign(Object.assign({}, payload), { section }));
                }
                catch (error) {
                    console.log(error);
                    continue;
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async UpdateDepartment(id, payload) {
        try {
            const section = await this.sectionService.findById(payload.section);
            return await this.studentService.updateById(id, Object.assign(Object.assign({}, payload), { section }));
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(id) {
        try {
            return await this.studentService.deleteById(id);
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
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findStudentByStudentId", null);
__decorate([
    (0, common_1.Get)('section/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findStudentsBySection", null);
__decorate([
    (0, common_1.Get)('id/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findStudentById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "CreateStudent", null);
__decorate([
    (0, common_1.Post)("bulk"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStudentBulkDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "CreateScheduleBulk", null);
__decorate([
    (0, common_1.Post)("import"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ImportStudentBulkDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "Import", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "UpdateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "delete", null);
StudentController = __decorate([
    (0, common_1.Controller)('/api/students'),
    __metadata("design:paramtypes", [student_service_1.StudentService,
        section_service_1.SectionService,
        department_service_1.DepartmentService])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map