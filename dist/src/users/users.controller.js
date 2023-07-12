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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const product_service_1 = require("../product/product.service");
const pipes_1 = require("@nestjs/common/pipes");
const jwt_authentication_guard_1 = require("../guard/jwt-authentication.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const files_configure_1 = require("../files/files.configure");
const fs = require("fs");
const swagger_1 = require("@nestjs/swagger");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService, productsService) {
        this.usersService = usersService;
        this.productsService = productsService;
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOneByMail(email) {
        return await this.usersService.getByEmail(email);
    }
    async setAwatar(file, request) {
        const user = request.user;
        if (file == undefined) {
            throw new common_1.HttpException("Bad picture", common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.awatar != "./images/unused-profile-preview.jpg") {
            await fs.unlink(user.awatar, (err) => {
                if (err) {
                    throw new common_1.HttpException("Problems with your picture", common_1.HttpStatus.BAD_REQUEST);
                }
            });
        }
        return this.usersService.updateAwatar({
            awatar: file.destination + file.filename,
        }, user);
    }
    async updateProfile(updateData, request) {
        const user = request.user;
        user.password = undefined;
        return this.usersService.updateProfile(updateData, user);
    }
    async getUserProducts(id) {
        return await this.usersService.getProductsByUserId(id);
    }
    async findOne(id) {
        return this.usersService.getById(Number(id));
    }
    async getMyPlans(request) {
        const user = request.user;
        return await this.usersService.getMyPlans(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получить всех пользователей" }),
    (0, swagger_1.ApiResponse)({ description: 'Все пользователи', }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':email'),
    (0, swagger_1.ApiOperation)({ summary: "Получить пользователя по логину" }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        required: true,
        description: 'Должен быть email пользователя, который существует в базе данных',
        type: String
    }),
    (0, swagger_1.ApiResponse)({ description: 'Пользователь', }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneByMail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Patch)('awatar'),
    (0, swagger_1.ApiOperation)({ summary: "Изменить фотографию профиля пользователя" }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ description: 'Картинка', }),
    (0, swagger_1.ApiResponse)({ description: "Пользователь" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture', { storage: (0, multer_1.diskStorage)({
            destination: files_configure_1.Customization.destinationPath,
            filename: files_configure_1.Customization.customFileName,
        }) })),
    openapi.ApiResponse({ status: 200, type: require("./user.entity").default }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setAwatar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Patch)('update'),
    (0, swagger_1.ApiOperation)({ summary: "Изменить данные пользователя" }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ description: 'Измененный пользователь (без пароля)', }),
    openapi.ApiResponse({ status: 200, type: require("./user.entity").default }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(':id/products'),
    (0, swagger_1.ApiOperation)({ summary: "Получить услуги, созданные пользователем" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID пользователя, который существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({ description: 'Услуги, созданные пользователем', }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Получить пользователя по ID" }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'Должен быть ID пользователя, который существует в базе данных',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({ description: 'Пользователь', }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Get)('my-records'),
    (0, swagger_1.ApiOperation)({ summary: "Получить записи пользователя" }),
    (0, swagger_1.ApiResponse)({
        description: 'Список записей пользователя',
        type: (Array)
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyPlans", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, product_service_1.ProductService])
], UsersController);
//# sourceMappingURL=users.controller.js.map