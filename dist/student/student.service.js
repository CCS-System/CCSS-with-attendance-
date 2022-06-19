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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_repository_1 = require("./student.repository");
let StudentService = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async findAll() {
        return await this.studentRepository.find({ relations: ["attendance", "section", "section.department", "attendance.schedule"] });
    }
    async findOneByStudentId(studentId) {
        return await this.studentRepository.findOne({
            where: { studentId }, relations: ["attendance", "section", "section.department", "attendance.schedule"]
        });
    }
    async findAllByDepartment(id) {
        return await this.studentRepository.find({ where: { section: { department: { id } } }, relations: ["attendance", "section", "section.department", "attendance.schedule"] });
    }
    async findAllBySection(id) {
        return await this.studentRepository.find({ where: { section: { id } }, relations: ["attendance", "section", "section.department", "attendance.schedule"] });
    }
    async findById(id) {
        return await this.studentRepository.findOne({
            where: { id }, relations: ["attendance", "section", "section.department", "attendance.schedule"]
        });
    }
    async create(student) {
        const newStudent = this.studentRepository.create(student);
        return await this.studentRepository.save(newStudent);
    }
    async deleteById(id) {
        return await this.studentRepository.delete({ id });
    }
    async updateById(id, student) {
        const newStudent = this.studentRepository.create(Object.assign(Object.assign({}, student), { id }));
        return await this.studentRepository.save(newStudent);
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_repository_1.StudentRepository)),
    __metadata("design:paramtypes", [student_repository_1.StudentRepository])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map