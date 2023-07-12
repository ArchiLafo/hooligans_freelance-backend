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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exceptions_1 = require("@nestjs/common/exceptions");
let ProductService = exports.ProductService = class ProductService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(productData, user) {
        const newProduct = await this.prismaService.product.create({
            data: {
                ...productData,
                authorId: user.id
            }
        });
        return newProduct;
    }
    async updateProduct(updateProductDto, user, idProduct) {
        return await this.prismaService.product.update({
            where: {
                id: idProduct
            },
            data: updateProductDto
        });
    }
    async deleteProduct(idProduct, user) {
        await this.prismaService.plan.deleteMany({
            where: {
                idProduct: idProduct
            }
        });
        return await this.prismaService.product.delete({
            where: {
                id: idProduct
            }
        });
    }
    async getAllProducts() {
        const allProducts = await this.prismaService.product.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        awatar: true
                    }
                }
            }
        });
        return allProducts;
    }
    async getOneProduct(id) {
        const product = await this.prismaService.product.findUnique({
            where: {
                id: id
            },
            include: {
                author: {
                    select: {
                        name: true,
                        awatar: true,
                        email: true
                    }
                }
            }
        });
        return product;
    }
    async getProductsByUser(user) {
        const products = await this.prismaService.product.findMany({
            where: {
                authorId: user.id
            },
            include: {
                author: {
                    select: {
                        name: true,
                        awatar: true
                    }
                }
            }
        });
        return products;
    }
    async getAllPlansProductForUsers(productId) {
        let arr = [];
        if (!(await this.prismaService.product.findUnique({
            where: {
                id: productId
            }
        }))) {
            throw new exceptions_1.NotFoundException('Not found this product');
        }
        const plansProduct = await this.prismaService.plan.findMany({ where: {
                idProduct: productId,
                clientId: null
            } });
        plansProduct.forEach(element => {
            const time = new Date(element.dayTime);
            arr.push({
                "record": element,
                "year": time.getFullYear(),
                "month": time.getMonth(),
                "day": time.getDay(),
                "hours": time.getHours(),
                "minutes": time.getMinutes(),
            });
        });
        return arr;
    }
    async getAllPlansProductForAdmin(productId) {
        return await this.prismaService.plan.findMany({ where: {
                clientId: {
                    not: null
                }
            } });
    }
    async getById(id) {
        console.log("id: " + id);
        const product = await this.prismaService.product.findUnique({
            where: {
                id: id,
            },
        });
        if (product) {
            return product;
        }
        throw new common_1.HttpException('Product with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map