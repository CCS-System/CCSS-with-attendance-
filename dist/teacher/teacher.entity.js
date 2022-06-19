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
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const department_entity_1 = require("../department/department.entity");
const schedule_entity_1 = require("../schedule/schedule.entity");
let Teacher = class Teacher {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Teacher.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => department_entity_1.Department, department => department.teachers, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Teacher.prototype, "departments", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Teacher.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedule_entity_1.Schedule, schedule => schedule.teacher, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Teacher.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Teacher.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Teacher.prototype, "updatedAt", void 0);
Teacher = __decorate([
    (0, typeorm_1.Entity)({ name: 'teacher' })
], Teacher);
exports.Teacher = Teacher;
//# sourceMappingURL=teacher.entity.js.map