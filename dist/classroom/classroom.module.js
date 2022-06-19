"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomModule = void 0;
const common_1 = require("@nestjs/common");
const classroom_controller_1 = require("./classroom.controller");
const classroom_service_1 = require("./classroom.service");
const typeorm_1 = require("@nestjs/typeorm");
const classroom_entity_1 = require("./classroom.entity");
const classroom_repository_1 = require("./classroom.repository");
const student_module_1 = require("../student/student.module");
const department_module_1 = require("../department/department.module");
const schedule_module_1 = require("../schedule/schedule.module");
let ClassroomModule = class ClassroomModule {
};
ClassroomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([classroom_entity_1.Classroom, classroom_repository_1.ClassroomRepository]),
            (0, common_1.forwardRef)(() => department_module_1.DepartmentModule),
            (0, common_1.forwardRef)(() => schedule_module_1.ScheduleModule),
            (0, common_1.forwardRef)(() => student_module_1.StudentModule),
        ],
        providers: [classroom_service_1.ClassroomService],
        controllers: [classroom_controller_1.ClassroomController],
        exports: [classroom_service_1.ClassroomService],
    })
], ClassroomModule);
exports.ClassroomModule = ClassroomModule;
//# sourceMappingURL=classroom.module.js.map