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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const section_entity_1 = require("../section/section.entity");
const teacher_entity_1 = require("../teacher/teacher.entity");
const course_entity_1 = require("../course/course.entity");
const classroom_entity_1 = require("../classroom/classroom.entity");
let Department = class Department {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Department.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, section => section.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Department.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => teacher_entity_1.Teacher, teacher => teacher.departments, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({ name: "department_teacher" }),
    __metadata("design:type", Array)
], Department.prototype, "teachers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.Course, course => course.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Department.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => classroom_entity_1.Classroom, classroom => classroom.department, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Department.prototype, "classrooms", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Department.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Department.prototype, "updatedAt", void 0);
Department = __decorate([
    (0, typeorm_1.Entity)({ name: 'department' })
], Department);
exports.Department = Department;
//# sourceMappingURL=department.entity.js.map