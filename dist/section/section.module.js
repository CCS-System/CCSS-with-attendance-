"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionModule = void 0;
const common_1 = require("@nestjs/common");
const section_controller_1 = require("./section.controller");
const section_service_1 = require("./section.service");
const typeorm_1 = require("@nestjs/typeorm");
const section_entity_1 = require("./section.entity");
const section_repository_1 = require("./section.repository");
const student_module_1 = require("../student/student.module");
const department_module_1 = require("../department/department.module");
const schedule_module_1 = require("../schedule/schedule.module");
let SectionModule = class SectionModule {
};
SectionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([section_entity_1.Section, section_repository_1.SectionRepository]),
            (0, common_1.forwardRef)(() => department_module_1.DepartmentModule),
            (0, common_1.forwardRef)(() => student_module_1.StudentModule),
            (0, common_1.forwardRef)(() => schedule_module_1.ScheduleModule),
        ],
        providers: [section_service_1.SectionService],
        controllers: [section_controller_1.SectionController],
        exports: [section_service_1.SectionService],
    })
], SectionModule);
exports.SectionModule = SectionModule;
//# sourceMappingURL=section.module.js.map