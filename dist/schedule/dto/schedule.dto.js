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
exports.CreateScheduleBulkDto = exports.CreateScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateScheduleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "classroom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "slots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], CreateScheduleDto.prototype, "weekday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    __metadata("design:type", Boolean)
], CreateScheduleDto.prototype, "makeup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    __metadata("design:type", Boolean)
], CreateScheduleDto.prototype, "reserved", void 0);
exports.CreateScheduleDto = CreateScheduleDto;
class CreateScheduleBulkDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], CreateScheduleBulkDto.prototype, "schedules", void 0);
exports.CreateScheduleBulkDto = CreateScheduleBulkDto;
//# sourceMappingURL=schedule.dto.js.map