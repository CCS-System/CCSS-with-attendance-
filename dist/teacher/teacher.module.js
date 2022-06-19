"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherModule = void 0;
const common_1 = require("@nestjs/common");
const teacher_controller_1 = require("./teacher.controller");
const teacher_service_1 = require("./teacher.service");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_entity_1 = require("./teacher.entity");
const teacher_repository_1 = require("./teacher.repository");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
const schedule_module_1 = require("../schedule/schedule.module");
const department_module_1 = require("../department/department.module");
let TeacherModule = class TeacherModule {
};
TeacherModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([teacher_entity_1.Teacher, teacher_repository_1.TeacherRepository]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => department_module_1.DepartmentModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => schedule_module_1.ScheduleModule),
        ],
        providers: [teacher_service_1.TeacherService],
        controllers: [teacher_controller_1.TeacherController],
        exports: [teacher_service_1.TeacherService],
    })
], TeacherModule);
exports.TeacherModule = TeacherModule;
//# sourceMappingURL=teacher.module.js.map