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
exports.AuthenticationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const register_dto_1 = require("./dto/register.dto");
const localAuthentication_guard_1 = require("../guard/localAuthentication.guard");
const jwt_authentication_guard_1 = require("../guard/jwt-authentication.guard");
const swagger_1 = require("@nestjs/swagger");
let AuthenticationController = exports.AuthenticationController = class AuthenticationController {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    async register(registrationData) {
        console.log(registrationData);
        return this.authenticationService.register(registrationData);
    }
    async logIn(request, response) {
        console.log(request);
        const { user } = request;
        const cookie = await this.authenticationService.getCookieWithJwtToken(user.id);
        request.res.set('Set-Cookie', cookie);
        user.password = undefined;
        return request.res.send(user);
    }
    async logOut(request, response) {
        response.setHeader('Set-Cookie', await this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }
    async authenticate(request) {
        const user = await request.user;
        return await user;
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация нового пользователя' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.default }),
    (0, swagger_1.ApiResponse)({
        description: 'Данные созданного пользователя',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(localAuthentication_guard_1.LocalAuthenticationGuard),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация пользователя' }),
    (0, swagger_1.ApiResponse)({
        description: 'Данные пользователя, без пароля'
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Выход из профиля пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Пользователь вышел из аккаунта'
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Аутентификация пользователя' }),
    (0, swagger_1.ApiResponse)({
        description: 'Данные пользователя, без пароля'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "authenticate", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map