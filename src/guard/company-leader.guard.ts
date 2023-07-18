import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CompanyService } from "src/company/company.service"
import { UsersService } from "src/users/users.service"

// проверяем, является ли пользователь владельцем компании
@Injectable()
export default class CompanyLeaderGuard implements CanActivate {
    constructor (private readonly usersService: UsersService, private readonly companyService: CompanyService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user, params} = context.switchToHttp().getRequest();
        try {
            await this.companyService.getById(Number(params.id));
        } catch (error) {
            return false;
        }

        // console.log(params)
        // console.log("user: " + user + "company: " + params)
        if (!user || !params) {
            return false;
        }

        const userId = user.id;
        const companyId = Number(params.id);
        const checkedUser = await this.usersService.getById(userId)
        // console.log("checkedUser: " + userId)
        const checkedCompany = await this.companyService.getById(companyId)
        // console.log("checkedCompany: " + companyId)

        // либо ты автор
        return (checkedUser.id === checkedCompany.leaderId);    
    }
}
    