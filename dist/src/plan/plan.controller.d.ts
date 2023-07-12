import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { PlanService } from './plan.service';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    creat(planData: any, request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    singUpPlan(plan: any, request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    update(plan: any, request: RequestWithUser, id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    delete(id: number, request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
}
