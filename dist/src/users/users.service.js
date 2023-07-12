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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const product_service_1 = require("../product/product.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(prismaService, productService) {
        this.prismaService = prismaService;
        this.productService = productService;
    }
    async create(userData) {
        const role = userData.role;
        const newUser = await this.prismaService.user.create({
            data: userData,
        });
        return newUser;
    }
    async updateProfile(updateData, user) {
        if (user.name == updateData.name) {
            throw new common_1.HttpException('You already have this name', common_1.HttpStatus.BAD_REQUEST);
        }
        user = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: updateData
        });
        user.password = undefined;
        return user;
    }
    async updateAwatar(setAwatarDto, user) {
        user = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                awatar: setAwatarDto.awatar,
            }
        });
        user.password = undefined;
        return user;
    }
    async findAll() {
        return await this.prismaService.user.findMany();
    }
    async getByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this email does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getProductsByUserId(id) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        if (user == null) {
            throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.productService.getProductsByUser(user);
    }
    async getMyPlans(user) {
        return await this.prismaService.plan.findMany({
            where: {
                clientId: user.id
            }
        });
    }
    async getById(id) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        if (user) {
            user.password = undefined;
            return user;
        }
        throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, product_service_1.ProductService])
], UsersService);
//# sourceMappingURL=users.service.js.map