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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_repository_1 = require("./department.repository");
const departments = [
    { id: 'SITE', name: 'School of Information Technology and Engineering' },
    { id: 'SCEE', name: 'School of Civil & Enviromental Engineering' },
    { id: 'SECE', name: 'School of Electrical & Computer Engineering' },
    { id: 'SMIE', name: 'School of Mechanical and Industrial Engineering' },
    { id: 'SCBE', name: 'School of Chemical and Bio Engineering' },
    { id: 'SMDE', name: 'School of Multi-disciplinary Engineering' },
];
let DepartmentService = class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async onApplicationBootstrap() {
        for (const department of departments) {
            try {
                await this.departmentRepository.save(this.departmentRepository.create(department));
            }
            catch (e) {
                console.log("DEPARTMENT: skipping seed");
            }
        }
    }
    async findAll() {
        return await this.departmentRepository.find();
    }
    async findById(id) {
        return await this.departmentRepository.findOne({
            where: { id }, relations: ["sections"]
        });
    }
    async findLikeOrCreate(id) {
        const result = await this.departmentRepository.findOne({
            where: { name: (0, typeorm_2.Like)(`%${id}%`) }, relations: ["sections"]
        });
        if (result) {
            return result;
        }
        else {
            return await this.create({ id, name: id });
        }
    }
    async create(department) {
        const newDepartment = this.departmentRepository.create(department);
        return await this.departmentRepository.save(newDepartment);
    }
    async deleteById(id) {
        return await this.departmentRepository.delete({ id });
    }
    async updateById(id, department) {
        const newDepartment = this.departmentRepository.create(Object.assign(Object.assign({}, department), { id }));
        return await this.departmentRepository.save(newDepartment);
    }
};
DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_repository_1.DepartmentRepository)),
    __metadata("design:paramtypes", [department_repository_1.DepartmentRepository])
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map