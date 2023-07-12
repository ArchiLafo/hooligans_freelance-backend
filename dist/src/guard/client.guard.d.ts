import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PlanService } from 'src/plan/plan.service';
export default class ClientGuard implements CanActivate {
    private readonly planService;
    constructor(planService: PlanService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
