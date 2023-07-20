import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PlanService } from 'src/plan/plan.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from "src/product/product.service"
import { UsersService } from "src/users/users.service"

// проверяем, может ли пользователь работать с записью
@Injectable()
export default class ClientGuard implements CanActivate {
    constructor (private readonly usersService: UsersService, readonly planService: PlanService, private readonly productService: ProductService, private readonly prismaService: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user, params} = context.switchToHttp().getRequest();
        // Будет тоже самое, потому что гварды говно
        try {
            const plan = await this.planService.getById(Number(params.id))
            await this.productService.getById(Number(plan.idProduct));
        } catch (error) {
            return false;   
        }

        console.log("user: " + user + "plan: " + params)
        if (!user || !params) {
            return false;
        }

        const planId = Number(params.id);
        const checkedPlan = await this.planService.getById(planId)
        console.log("checkedPlan: " + checkedPlan.idProduct)

        const currentDate = new Date();
        if (checkedPlan.datetime < currentDate) {
            const deletePlan = await this.prismaService.plan.delete({where: {id: planId}})
            console.log("Удалена запись на время" + deletePlan)
        }

        // либо ты админ
        if (user?.role.includes(Role.Admin)) {
            return true;
        }

        const userId = user.id;

        // либо ты клиент
        if (user.id == checkedPlan.clientId) {
            return true;
        }

        const checkedProduct = await this.productService.getById(checkedPlan.idProduct)
        // либо ты автор
        return (user.id === checkedProduct.authorId);    
    }
}
