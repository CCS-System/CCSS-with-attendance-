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
exports.ClassroomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const classroom_repository_1 = require("./classroom.repository");
let ClassroomService = class ClassroomService {
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }
    async findAll() {
        return await this.classroomRepository.find({ relations: ["department"] });
    }
    async findAllByDepartment(id) {
        return await this.classroomRepository.find({ where: { department: { id } }, relations: ["department"] });
    }
    async findById(id) {
        return await this.classroomRepository.findOne({
            where: { id }, relations: ["department"]
        });
    }
    async create(classroom) {
        const newClassroom = this.classroomRepository.create(classroom);
        return await this.classroomRepository.save(newClassroom);
    }
    async deleteById(id) {
        return await this.classroomRepository.delete({ id });
    }
    async updateById(id, classroom) {
        const newClassroom = this.classroomRepository.create(Object.assign(Object.assign({}, classroom), { id }));
        return await this.classroomRepository.save(newClassroom);
    }
};
ClassroomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(classroom_repository_1.ClassroomRepository)),
    __metadata("design:paramtypes", [classroom_repository_1.ClassroomRepository])
], ClassroomService);
exports.ClassroomService = ClassroomService;
//# sourceMappingURL=classroom.service.js.map