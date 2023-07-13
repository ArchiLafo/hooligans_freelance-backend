import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PlanService } from 'src/plan/plan.service';
import { ProductService } from "src/product/product.service"
import { UsersService } from "src/users/users.service"

// проверяем, может ли пользователь работать с записью
@Injectable()
export default class ClientGuard implements CanActivate {
    constructor (private readonly usersService: UsersService, readonly planService: PlanService, private readonly productService: ProductService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("Он либо записан, либо автор, либо админ")
        const {user, params} = context.switchToHttp().getRequest();
        // Будет тоже самое, потому что гварды говно
        try {
            const plan = await this.planService.getById(Number(params.id))
            await this.productService.getById(Number(plan.idProduct));
        } catch (error) {
            console.log("Данные говно")
            return false;   
        }

        console.log("user: " + user + "plan: " + params)
        if (!user || !params) {
            return false;
        }
        // либо ты админ
        if (user?.role.includes(Role.Admin)) {
            console.log("Проверка на админа: " + true);
            return true;
        }

        const userId = user.id;
        const planId = Number(params.id);
        const checkedPlan = await this.planService.getById(planId)
        console.log("checkedPlan: " + checkedPlan.id)

        // либо ты клиент
        if (user.id == checkedPlan.clientId) {
            console.log("Проверка на клиента: " + true);
            return true;
        }

        const checkedProduct = await this.productService.getById(checkedPlan.idProduct)
        console.log("checkedProduct: " + checkedProduct.id)
        // либо ты автор
        console.log("Проверка на автора: " + (user.id === checkedProduct.authorId))
        return (user.id === checkedProduct.authorId);    
    }
}
