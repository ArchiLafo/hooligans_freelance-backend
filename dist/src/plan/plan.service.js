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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlanService = exports.PlanService = class PlanService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(planData) {
        if (!(await this.prismaService.product.findUnique({
            where: {
                id: planData.idProduct
            }
        }))) {
            throw new common_1.NotFoundException('Not found this product');
        }
        const time = new Date(planData.year, planData.month - 1, planData.day, planData.hours, planData.minutes);
        const newPlan = await this.prismaService.plan.create({
            data: {
                idProduct: planData.idProduct,
                dayTime: time,
                clientId: null
            }
        });
        return newPlan;
    }
    async singUpPlan(idPlan, user) {
        const plans = await this.prismaService.plan.findUnique({
            where: {
                id: idPlan
            }
        });
        if (plans.clientId == null) {
            return await this.prismaService.plan.update({ where: {
                    id: idPlan
                },
                data: {
                    clientId: user.id
                }
            });
        }
        else {
            throw new common_1.HttpException("Такая услуга не существует", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async cancelPlan(idPlan) {
        return await this.prismaService.plan.update({
            where: {
                id: idPlan
            },
            data: {
                clientId: null
            }
        });
    }
    async update(idPlan, daytime) {
        return await this.prismaService.plan.update({
            where: {
                id: idPlan
            },
            data: {
                dayTime: daytime
            }
        });
    }
    async deletePlan(idPlan) {
        return await this.prismaService.plan.delete({
            where: {
                id: idPlan,
            }
        });
    }
    async getById(idPlan) {
        return await this.prismaService.plan.findFirst({
            where: {
                id: idPlan
            }
        });
    }
};
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanService);
//# sourceMappingURL=plan.service.js.map