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
exports.ScheduleService = exports.createSlotMatrix = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_repository_1 = require("./schedule.repository");
const scheduler_1 = require("./scheduler");
function createSlotMatrix() {
    const matrix = [];
    for (let index = 0; index < 6; index++) {
        matrix.push(Array(15).fill(false));
    }
    return matrix;
}
exports.createSlotMatrix = createSlotMatrix;
let ScheduleService = class ScheduleService {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async findAll() {
        return await this.scheduleRepository.find({ relations: ["section", "section.department", "teacher", "teacher.departments", "teacher.user", "classroom", "students", "students.section", "students.section.department"] });
    }
    async findAllBySection(id) {
        return await this.scheduleRepository.find({ where: { section: { id } }, relations: ["section", "section.department", "teacher", "teacher.departments", "teacher.user", "classroom", "students", "students.section", "students.section.department"] });
    }
    async findAllByClassroom(id) {
        return await this.scheduleRepository.find({ where: { classroom: { id } }, relations: ["section", "section.department", "teacher", "teacher.departments", "teacher.user", "classroom", "students", "students.section", "students.section.department"] });
    }
    async findAllByTeacher(id) {
        return await this.scheduleRepository.find({ where: { teacher: { id } }, relations: ["section", "section.department", "teacher", "teacher.departments", "teacher.user", "classroom", "students", "students.section", "students.section.department"] });
    }
    async findById(id) {
        return await this.scheduleRepository.findOne({
            where: { id }, relations: ["section", "section.department", "teacher", "teacher.departments", "teacher.user", "classroom", "students", "students.section", "students.section.department", "students.attendance", "students.attendance.schedule"]
        });
    }
    async findByIdAttendance(id) {
        return await this.scheduleRepository.findOne({
            where: { attendance: { schedule: { id } } }, relations: ["section", "section.department", "teacher", "teacher.departments", "teacher.user", "classroom", "students", "students.section", "students.section.department", "students.attendance",]
        });
    }
    async create(schedule) {
        const newSchedule = this.scheduleRepository.create(schedule);
        return await this.scheduleRepository.save(newSchedule);
    }
    async deleteById(id) {
        return await this.scheduleRepository.delete({ id });
    }
    async updateById(id, schedule) {
        const newSchedule = this.scheduleRepository.create(Object.assign(Object.assign({}, schedule), { id }));
        return await this.scheduleRepository.save(newSchedule);
    }
    async slotMatrixBy(val, id) {
        const schedules = (await this.scheduleRepository.find({ where: { [val]: { id } } })).map((props) => (Object.assign(Object.assign({}, props), { slots: props.slots.split(",").map((s) => parseInt(s)) })));
        const matrix = createSlotMatrix();
        for (const s of schedules) {
            const weekday = s.weekday;
            for (const slot of s.slots) {
                matrix[weekday][slot] = true;
            }
        }
        return matrix;
    }
    async slotMatrixByYearAndSemester(val, id, year, semester) {
        const schedules = (await this.scheduleRepository.find({ where: { [val]: { id }, year, semester } })).map((props) => (Object.assign(Object.assign({}, props), { slots: props.slots.split(",").map((s) => parseInt(s)) })));
        const matrix = createSlotMatrix();
        for (const s of schedules) {
            const weekday = s.weekday;
            for (const slot of s.slots) {
                matrix[weekday][slot] = true;
            }
        }
        return matrix;
    }
    async generate(e) {
        return (0, scheduler_1.runScheduler)(e);
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(schedule_repository_1.ScheduleRepository)),
    __metadata("design:paramtypes", [schedule_repository_1.ScheduleRepository])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map