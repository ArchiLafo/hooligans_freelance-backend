import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
export declare class ModerationService {
    private readonly prismaService;
    private readonly productService;
    private readonly userService;
    constructor(prismaService: PrismaService, productService: ProductService, userService: UsersService);
    publish(idProduct: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        places: string;
        category: string;
        duration: string;
        title: string;
        cost: string;
        description: string;
        authorId: number;
        isPublished: boolean;
    }, unknown> & {}>;
}
