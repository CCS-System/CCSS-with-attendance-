"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_controller_1 = require("./schedule.controller");
const schedule_service_1 = require("./schedule.service");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_entity_1 = require("./schedule.entity");
const schedule_repository_1 = require("./schedule.repository");
const teacher_module_1 = require("../teacher/teacher.module");
const classroom_module_1 = require("../classroom/classroom.module");
const section_module_1 = require("../section/section.module");
const student_module_1 = require("../student/student.module");
let ScheduleModule = class ScheduleModule {
};
ScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([schedule_entity_1.Schedule, schedule_repository_1.ScheduleRepository]),
            (0, common_1.forwardRef)(() => section_module_1.SectionModule),
            (0, common_1.forwardRef)(() => teacher_module_1.TeacherModule),
            (0, common_1.forwardRef)(() => classroom_module_1.ClassroomModule),
            (0, common_1.forwardRef)(() => student_module_1.StudentModule),
        ],
        providers: [schedule_service_1.ScheduleService],
        controllers: [schedule_controller_1.ScheduleController],
        exports: [schedule_service_1.ScheduleService],
    })
], ScheduleModule);
exports.ScheduleModule = ScheduleModule;
//# sourceMappingURL=schedule.module.js.map