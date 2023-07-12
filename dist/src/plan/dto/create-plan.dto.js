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
exports.CreatePlanDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePlanDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { idProduct: { required: true, type: () => Number }, dayTime: { required: true, type: () => Date } };
    }
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID продукта, который содержится в базе данных',
        example: '1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "idProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Запись на проведение услуги',
        example: '2023-07-10T15:30:00+07:00',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreatePlanDto.prototype, "dayTime", void 0);
exports.default = CreatePlanDto;
//# sourceMappingURL=create-plan.dto.js.map