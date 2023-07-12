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
exports.ModerationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
let ModerationService = exports.ModerationService = class ModerationService {
    constructor(prismaService, productService, userService) {
        this.prismaService = prismaService;
        this.productService = productService;
        this.userService = userService;
    }
    async publish(idProduct) {
        return await this.prismaService.product.update({ where: { id: idProduct }, data: { isPublished: true } });
    }
};
exports.ModerationService = ModerationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, product_service_1.ProductService, users_service_1.UsersService])
], ModerationService);
//# sourceMappingURL=moderation.service.js.map