import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PlanService } from 'src/plan/plan.service';
import { ProductService } from "src/product/product.service";
import { UsersService } from "src/users/users.service";
export default class PlanGuard implements CanActivate {
    private readonly usersService;
    readonly planService: PlanService;
    private readonly productService;
    constructor(usersService: UsersService, planService: PlanService, productService: ProductService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
