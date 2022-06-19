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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("./attendance.service");
const attendance_dto_1 = require("./dto/attendance.dto");
const student_service_1 = require("../student/student.service");
const schedule_service_1 = require("../schedule/schedule.service");
let AttendanceController = class AttendanceController {
    constructor(attendanceService, studentService, scheduleService) {
        this.attendanceService = attendanceService;
        this.studentService = studentService;
        this.scheduleService = scheduleService;
    }
    async findAll() {
        try {
            return await this.attendanceService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find attendances`);
        }
    }
    async findAllSchedule(id) {
        try {
            return await this.attendanceService.findAllBySchedule(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find attendances`);
        }
    }
    async findAttendanceByStudentId(studentId) {
        try {
            return await this.attendanceService.findAllByStudent(studentId);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Cannot find attendance #${studentId}`);
        }
    }
    async CreateAttendance(payload) {
        try {
            const schedule = await this.scheduleService.findById(payload.schedule);
            for (const s of payload.students) {
                const student = await this.studentService.findById(s.id);
                if (student) {
                    await this.attendanceService.create({ date: payload.date, absent: s.absent, student, schedule });
                }
                else {
                    throw new common_1.NotFoundException("Student not found");
                }
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add request', error);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("schedule/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAllSchedule", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAttendanceByStudentId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "CreateAttendance", null);
AttendanceController = __decorate([
    (0, common_1.Controller)('/api/attendances'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService,
        student_service_1.StudentService,
        schedule_service_1.ScheduleService])
], AttendanceController);
exports.AttendanceController = AttendanceController;
//# sourceMappingURL=attendance.controller.js.map