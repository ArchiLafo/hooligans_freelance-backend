import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ModerationService {
    constructor(private readonly prismaService: PrismaService, private readonly productService: ProductService, private readonly userService: UsersService) {}
    
    // публиковать записи
    async publish(idProduct: number) {
        return await this.prismaService.product.update({where: { id: idProduct}, data: { isPublished: true}});
    }
}
