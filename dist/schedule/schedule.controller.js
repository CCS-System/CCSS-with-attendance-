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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
const schedule_dto_1 = require("./dto/schedule.dto");
const section_service_1 = require("../section/section.service");
const teacher_service_1 = require("../teacher/teacher.service");
const classroom_service_1 = require("../classroom/classroom.service");
const student_service_1 = require("../student/student.service");
let ScheduleController = class ScheduleController {
    constructor(scheduleService, sectionService, teacherService, classroomService, studentService) {
        this.scheduleService = scheduleService;
        this.sectionService = sectionService;
        this.teacherService = teacherService;
        this.classroomService = classroomService;
        this.studentService = studentService;
    }
    async findAll() {
        try {
            return await this.scheduleService.findAll();
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException(`Cannot find schedules`, error);
        }
    }
    async findAllById(id) {
        try {
            return await this.scheduleService.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find schedule`);
        }
    }
    async findAllByIdAttendance(id) {
        try {
            return await this.scheduleService.findByIdAttendance(id);
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException(`Cannot find schedule`);
        }
    }
    async findAllBySection(id) {
        try {
            return await this.scheduleService.findAllBySection(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find schedules`);
        }
    }
    async findAllByTeacher(id) {
        try {
            return await this.scheduleService.findAllByTeacher(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find schedules`);
        }
    }
    async findAllByClassroom(id) {
        try {
            return await this.scheduleService.findAllByClassroom(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find schedules`);
        }
    }
    async CreateSchedule(payload) {
        try {
            const section = await this.sectionService.findById(payload.section);
            const teacher = await this.teacherService.findById(payload.teacher);
            const classroom = await this.classroomService.findById(payload.classroom);
            const students = await this.studentService.findAllBySection(section.id);
            if (section && teacher && classroom) {
                return await this.scheduleService.create(Object.assign(Object.assign({}, payload), { section, teacher, classroom, students }));
            }
            throw new common_1.NotFoundException("Entity not found");
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async CreateReservedSchedule(payload) {
        try {
            const teacher = await this.teacherService.findById(payload.teacher);
            if (teacher) {
                return await this.scheduleService.create({ name: payload.name, year: payload.year, semester: payload.semester, slots: payload.slots, weekday: payload.weekday, reserved: true, teacher });
            }
            throw new common_1.NotFoundException("Entity not found");
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async CreateScheduleBulk(bulk) {
        try {
            for (const payload of bulk.schedules) {
                const section = await this.sectionService.findById(payload.section);
                const teacher = await this.teacherService.findById(payload.teacher);
                const classroom = await this.classroomService.findById(payload.classroom);
                const students = await this.studentService.findAllBySection(section.id);
                if (section && teacher && classroom) {
                    await this.scheduleService.create(Object.assign(Object.assign({}, payload), { section, teacher, classroom, students }));
                }
                else {
                    throw new common_1.NotFoundException("Entity not found");
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async GenerateSchedule(payload) {
        try {
            return this.scheduleService.generate(payload);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
    async delete(id) {
        try {
            return await this.scheduleService.deleteById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find schedule #${id}`, error);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAllById", null);
__decorate([
    (0, common_1.Get)("attendance/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAllByIdAttendance", null);
__decorate([
    (0, common_1.Get)("section/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAllBySection", null);
__decorate([
    (0, common_1.Get)("teacher/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAllByTeacher", null);
__decorate([
    (0, common_1.Get)("classroom/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAllByClassroom", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "CreateSchedule", null);
__decorate([
    (0, common_1.Post)("reserved"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "CreateReservedSchedule", null);
__decorate([
    (0, common_1.Post)("bulk"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_dto_1.CreateScheduleBulkDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "CreateScheduleBulk", null);
__decorate([
    (0, common_1.Post)("generate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "GenerateSchedule", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "delete", null);
ScheduleController = __decorate([
    (0, common_1.Controller)('/api/schedules'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
        section_service_1.SectionService,
        teacher_service_1.TeacherService,
        classroom_service_1.ClassroomService,
        student_service_1.StudentService])
], ScheduleController);
exports.ScheduleController = ScheduleController;
//# sourceMappingURL=schedule.controller.js.map