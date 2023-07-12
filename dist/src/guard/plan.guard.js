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
const plan_service_1 = require("../plan/plan.service");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
let PlanGuard = class PlanGuard {
    constructor(usersService, planService, productService) {
        this.usersService = usersService;
        this.planService = planService;
        this.productService = productService;
    }
    async canActivate(context) {
        const { user, params } = context.switchToHttp().getRequest();
        try {
            const plan = await this.planService.getById(Number(params.id));
            await this.productService.getById(Number(plan.idProduct));
        }
        catch (error) {
            return false;
        }
        console.log(params);
        console.log("user: " + user + "plan: " + params);
        if (!user || !params) {
            return false;
        }
        if (user?.role.includes(client_1.Role.Admin)) {
            return true;
        }
        const userId = user.id;
        const planId = Number(params.id);
        const checkedUser = await this.usersService.getById(userId);
        console.log("checkedUser: " + checkedUser.id);
        const checkedPlan = await this.planService.getById(planId);
        console.log("checkedPlan: " + checkedPlan.idProduct);
        const checkedProduct = await this.productService.getById(checkedPlan.idProduct);
        console.log("checkedProduct: " + checkedProduct.authorId);
        return (checkedUser.id === checkedProduct.authorId);
    }
};
PlanGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, plan_service_1.PlanService, product_service_1.ProductService])
], PlanGuard);
exports.default = PlanGuard;
//# sourceMappingURL=plan.guard.js.map