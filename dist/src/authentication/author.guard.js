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
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
let AuthorGuard = class AuthorGuard {
    constructor(usersService, productService) {
        this.usersService = usersService;
        this.productService = productService;
    }
    async canActivate(context) {
        const { user, params } = context.switchToHttp().getRequest();
        try {
            await this.productService.getById(Number(params.id));
        }
        catch (error) {
            return false;
        }
        console.log(params);
        console.log("user: " + user + "product: " + params);
        if (!user || !params) {
            return false;
        }
        if (user?.role.includes(client_1.Role.Admin)) {
            return true;
        }
        const userId = user.id;
        const productId = Number(params.id);
        const checkedUser = await this.usersService.getById(userId);
        console.log("checkedUser: " + userId);
        const checkedProduct = await this.productService.getById(productId);
        console.log("checkedProduct: " + productId);
        return (checkedUser.id === checkedProduct.authorId);
    }
};
AuthorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, product_service_1.ProductService])
], AuthorGuard);
exports.default = AuthorGuard;
//# sourceMappingURL=author.guard.js.map