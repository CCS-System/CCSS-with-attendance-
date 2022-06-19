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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_repository_1 = require("./teacher.repository");
let TeacherService = class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository;
    }
    async findAll() {
        return await this.teacherRepository.find({ relations: ["departments", "user"] });
    }
    async findAllByDepartment(id) {
        const teachers = await this.teacherRepository.find({ relations: ["departments", "user"] });
        return teachers.filter(({ departments }) => {
            let found = false;
            for (const department of departments) {
                if (department.id === id) {
                    found = true;
                    break;
                }
            }
            return found;
        });
    }
    async findOneByUserId(id) {
        return await this.teacherRepository.findOne({ where: { user: { id } }, relations: ["departments", "user"] });
    }
    async findById(id) {
        return await this.teacherRepository.findOne({ where: { id }, relations: ["departments", "user"] });
    }
    async create(teacher) {
        const newTeacher = this.teacherRepository.create(teacher);
        return await this.teacherRepository.save(newTeacher);
    }
    async deleteById(id) {
        return await this.teacherRepository.delete({ id });
    }
    async updateById(id, teacher) {
        const newTeacher = this.teacherRepository.create(Object.assign(Object.assign({}, teacher), { id }));
        return await this.teacherRepository.save(newTeacher);
    }
};
TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_repository_1.TeacherRepository)),
    __metadata("design:paramtypes", [teacher_repository_1.TeacherRepository])
], TeacherService);
exports.TeacherService = TeacherService;
//# sourceMappingURL=teacher.service.js.map