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
exports.Classroom = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../department/department.entity");
const schedule_entity_1 = require("../schedule/schedule.entity");
let Classroom = class Classroom {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Classroom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Classroom.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Classroom.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Classroom.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, department => department.classrooms, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", department_entity_1.Department)
], Classroom.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedule_entity_1.Schedule, schedule => schedule.classroom, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Classroom.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Classroom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Classroom.prototype, "updatedAt", void 0);
Classroom = __decorate([
    (0, typeorm_1.Entity)({ name: 'classroom' })
], Classroom);
exports.Classroom = Classroom;
//# sourceMappingURL=classroom.entity.js.map