"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_middleware_1 = require("./auth/middleware/auth.middleware");
const core_1 = require("@nestjs/core");
const role_guard_1 = require("./auth/guard/role.guard");
const storage_module_1 = require("./storage/storage.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const teacher_module_1 = require("./teacher/teacher.module");
const section_module_1 = require("./section/section.module");
const attendance_module_1 = require("./attendance/attendance.module");
const course_module_1 = require("./course/course.module");
const classroom_module_1 = require("./classroom/classroom.module");
const schedule_module_1 = require("./schedule/schedule.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'web'),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            storage_module_1.StorageModule,
            attendance_module_1.AttendanceModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            teacher_module_1.TeacherModule,
            section_module_1.SectionModule,
            course_module_1.CourseModule,
            classroom_module_1.ClassroomModule,
            schedule_module_1.ScheduleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map