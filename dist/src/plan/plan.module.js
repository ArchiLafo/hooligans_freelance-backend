"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModule = void 0;
const common_1 = require("@nestjs/common");
const plan_service_1 = require("./plan.service");
const plan_controller_1 = require("./plan.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const users_service_1 = require("../users/users.service");
const product_service_1 = require("../product/product.service");
let PlanModule = exports.PlanModule = class PlanModule {
};
exports.PlanModule = PlanModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [plan_service_1.PlanService, users_service_1.UsersService, product_service_1.ProductService],
        controllers: [plan_controller_1.PlanController],
        exports: [plan_service_1.PlanService],
    })
], PlanModule);
//# sourceMappingURL=plan.module.js.map