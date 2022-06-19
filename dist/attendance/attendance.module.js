"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const attendance_controller_1 = require("./attendance.controller");
const attendance_service_1 = require("./attendance.service");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("./attendance.entity");
const attendance_repository_1 = require("./attendance.repository");
;
const student_module_1 = require("../student/student.module");
const schedule_module_1 = require("../schedule/schedule.module");
let AttendanceModule = class AttendanceModule {
};
AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([attendance_entity_1.Attendance, attendance_repository_1.AttendanceRepository]),
            (0, common_1.forwardRef)(() => student_module_1.StudentModule),
            (0, common_1.forwardRef)(() => schedule_module_1.ScheduleModule),
        ],
        providers: [attendance_service_1.AttendanceService],
        controllers: [attendance_controller_1.AttendanceController],
        exports: [attendance_service_1.AttendanceService],
    })
], AttendanceModule);
exports.AttendanceModule = AttendanceModule;
//# sourceMappingURL=attendance.module.js.map