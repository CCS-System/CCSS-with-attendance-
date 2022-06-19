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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const section_entity_1 = require("../section/section.entity");
const teacher_entity_1 = require("../teacher/teacher.entity");
const classroom_entity_1 = require("../classroom/classroom.entity");
const student_entity_1 = require("../student/student.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
let Schedule = class Schedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Schedule.prototype, "weekday", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "slots", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Schedule.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Schedule.prototype, "reserved", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Schedule.prototype, "makeup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => section_entity_1.Section, section => section.schedules, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", section_entity_1.Section)
], Schedule.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, teacher => teacher.schedules, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], Schedule.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => classroom_entity_1.Classroom, classroom => classroom.schedules, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", classroom_entity_1.Classroom)
], Schedule.prototype, "classroom", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.Student, student => student.schedules, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({ name: "enrollment" }),
    __metadata("design:type", Array)
], Schedule.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, attendance => attendance.schedule, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Schedule.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Schedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Schedule.prototype, "updatedAt", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)({ name: 'schedule' })
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.entity.js.map