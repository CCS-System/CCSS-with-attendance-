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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["TEACHER"] = "TEACHER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const teacher_entity_1 = require("../teacher/teacher.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.TEACHER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => teacher_entity_1.Teacher, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", teacher_entity_1.Teacher)
], User.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "profile_picture", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "tokenVersion", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map