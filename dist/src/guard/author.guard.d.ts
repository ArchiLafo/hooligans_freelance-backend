import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ProductService } from "src/product/product.service";
import { UsersService } from "src/users/users.service";
export default class AuthorGuard implements CanActivate {
    private readonly usersService;
    private readonly productService;
    constructor(usersService: UsersService, productService: ProductService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
