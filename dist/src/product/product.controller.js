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
exports.ProductController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const pipes_1 = require("@nestjs/common/pipes");
const update_product_dto_1 = require("./dto/update-product.dto");
const jwt_authentication_guard_1 = require("../guard/jwt-authentication.guard");
const author_guard_1 = require("../guard/author.guard");
const swagger_1 = require("@nestjs/swagger");
let ProductController = exports.ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts() {
        return await this.productService.getAllProducts();
    }
    async updateProduct(id, updateProductDto, request) {
        console.log(id);
        const user = request.user;
        return this.productService.updateProduct(updateProductDto, user, id);
    }
    async deleteProduct(request, id) {
        const user = request.user;
        return this.productService.deleteProduct(id, user);
    }
    async getOneProducts(id) {
        return await this.productService.getOneProduct(id);
    }
    async getAllPlansProductForUser(id) {
        return await this.productService.getAllPlansProductForUsers(id);
    }
    async getAllPlansProductForAdmin(request, id) {
        return await this.productService.getAllPlansProductForAdmin(id);
    }
    async register(registrationData, request) {
        const user = request.user;
        return this.productService.create(registrationData, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получить все услуги" }),
    (0, swagger_1.ApiResponse)({
        description: 'Список всех созданных услуг',
        type: (Array)
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default, author_guard_1.default),
    (0, common_1.Patch)('update/:id'),
    (0, swagger_1.ApiOperation)({ summary: "Изменить услугу" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID услуги, которая существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.default }),
    (0, swagger_1.ApiResponse)({
        description: 'Обновленная услуга',
        type: update_product_dto_1.default
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default, author_guard_1.default),
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: "Удалить услугу" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID услуги, которая существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({ description: 'Услуга удалена', }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Получить услугу" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID услуги, которая существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({ description: 'Услуга', }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOneProducts", null);
__decorate([
    (0, common_1.Get)(':id/plans'),
    (0, swagger_1.ApiOperation)({ summary: "Получить все доступные записи на услугу" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID услуги, которая существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({ description: 'Все доступные записи', }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllPlansProductForUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default, author_guard_1.default),
    (0, common_1.Get)(':id/plans/information'),
    (0, swagger_1.ApiOperation)({ summary: "Получение заполненных записей для владельца услуги или админа" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID услуги, которая существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Список занятых записей',
        type: (Array),
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllPlansProductForAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiOperation)({ summary: "Создание новой услуги" }),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.default, }),
    (0, swagger_1.ApiResponse)({
        description: 'Созданная услуга',
        type: create_product_dto_1.default,
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "register", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map