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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_repository_1 = require("./course.repository");
let CourseService = class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async findAll() {
        return await this.courseRepository.find({ relations: ["department"] });
    }
    async findAllByDepartment(id) {
        return await this.courseRepository.find({ where: { department: { id } }, relations: ["department"] });
    }
    async findById(id) {
        return await this.courseRepository.findOne({
            where: { id }, relations: ["department"]
        });
    }
    async create(course) {
        const newCourse = this.courseRepository.create(course);
        return await this.courseRepository.save(newCourse);
    }
    async deleteById(id) {
        return await this.courseRepository.delete({ id });
    }
    async updateById(id, course) {
        const newCourse = this.courseRepository.create(Object.assign(Object.assign({}, course), { id }));
        return await this.courseRepository.save(newCourse);
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_repository_1.CourseRepository)),
    __metadata("design:paramtypes", [course_repository_1.CourseRepository])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map