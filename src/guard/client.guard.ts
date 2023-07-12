import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PlanService } from 'src/plan/plan.service';

// проверяем, pзаписан ли пользоваетль на услугу
@Injectable()
export default class ClientGuard implements CanActivate {
    constructor ( private readonly planService: PlanService ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const {user, params} = context.switchToHttp().getRequest();
        console.log("user: " + user + "plan: " + params)
        const checkedPlan = await this.planService.getById(Number(params.id));
        return (user.id === checkedPlan.clientId);    
    }
}