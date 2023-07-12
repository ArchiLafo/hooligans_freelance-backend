import { PrismaService } from 'src/prisma/prisma.service';
import User from 'src/users/user.entity';
export declare class PlanService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(planData: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    singUpPlan(idPlan: number, user: User): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    cancelPlan(idPlan: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    update(idPlan: number, daytime: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    deletePlan(idPlan: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
    getById(idPlan: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {}>;
}
