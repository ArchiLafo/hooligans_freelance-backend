import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ProductService } from "src/product/product.service"
import { UsersService } from "src/users/users.service"

// проверяем, может ли пользователь работать с услугой
@Injectable()
export default class AuthorGuard implements CanActivate {
    constructor (private readonly usersService: UsersService, private readonly productService: ProductService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user, params} = context.switchToHttp().getRequest();
        try {
            await this.productService.getById(Number(params.id));
        } catch (error) {
            return false;
        }
        console.log(params)
        console.log("user: " + user + "product: " + params)
        if (!user || !params) {
            return false;
        }
        // либо ты админ
        if (user?.role.includes(Role.Admin)) {
            return true;
        }

        const userId = user.id;
        const productId = Number(params.id);
        const checkedUser = await this.usersService.getById(userId)
        const checkedProduct = await this.productService.getById(productId)

        // либо ты автор
        return (checkedUser.id === checkedProduct.authorId);    
    }
}
    