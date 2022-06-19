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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const attendance_entity_1 = require("../attendance/attendance.entity");
const section_entity_1 = require("../section/section.entity");
const schedule_entity_1 = require("../schedule/schedule.entity");
let Student = class Student {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Student.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => section_entity_1.Section, section => section.students, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", section_entity_1.Section)
], Student.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, attendance => attendance.student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Student.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => schedule_entity_1.Schedule, schedule => schedule.students, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Student.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Student.prototype, "updatedAt", void 0);
Student = __decorate([
    (0, typeorm_1.Entity)({ name: 'student' })
], Student);
exports.Student = Student;
//# sourceMappingURL=student.entity.js.map