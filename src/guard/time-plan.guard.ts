import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PlanService } from 'src/plan/plan.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class TimePlanGuard implements CanActivate {
    constructor (private readonly planService: PlanService, 
        private readonly prismaService: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user, params} = context.switchToHttp().getRequest();

        try {
            const plan = await this.planService.getById(Number(params.id))
        } catch (error) {
            return false;   
        }

        if (!user || !params) {
            return false;
        }

        const plans = await this.prismaService.plan.findMany({
            where: {
            clientId: user.id
        }});

        const currentDate = new Date();
        plans.forEach(async element => {
            if (element.datetime < currentDate) {
                const deletePlan = await this.prismaService.plan.delete({where: {id: element.id}})
                console.log("Удалена запись на время" + deletePlan)
            }
        });

        const check = await this.prismaService.plan.findMany({
            where: {
            clientId: user.id
        }});

        // проверить
        console.log(check);
        return await true;
    }
}