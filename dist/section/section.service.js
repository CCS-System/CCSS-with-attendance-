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
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const section_repository_1 = require("./section.repository");
const department_service_1 = require("../department/department.service");
let SectionService = class SectionService {
    constructor(sectionRepository, departmentService) {
        this.sectionRepository = sectionRepository;
        this.departmentService = departmentService;
    }
    async findAll() {
        return await this.sectionRepository.find({ relations: ["department"] });
    }
    async findAllByDepartment(id) {
        return await this.sectionRepository.find({ where: { department: { id } }, relations: ["department"] });
    }
    async findById(id) {
        return await this.sectionRepository.findOne({
            where: { id }, relations: ["department"]
        });
    }
    async findLikeOrCreate(department, name) {
        const result = await this.sectionRepository.findOne({
            where: { department: { id: department }, name: (0, typeorm_2.Like)(`%${name}%`) }, relations: ["department"]
        });
        if (result) {
            return result;
        }
        else {
            const d = await this.departmentService.findById(department);
            return await this.create({ name, department: d, year: "2022" });
        }
    }
    async create(section) {
        const newSection = this.sectionRepository.create(section);
        return await this.sectionRepository.save(newSection);
    }
    async deleteById(id) {
        return await this.sectionRepository.delete({ id });
    }
    async updateById(id, section) {
        const newSection = this.sectionRepository.create(Object.assign(Object.assign({}, section), { id }));
        return await this.sectionRepository.save(newSection);
    }
};
SectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_repository_1.SectionRepository)),
    __metadata("design:paramtypes", [section_repository_1.SectionRepository,
        department_service_1.DepartmentService])
], SectionService);
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map