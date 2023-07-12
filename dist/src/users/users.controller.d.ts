/// <reference types="multer" />
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
export declare class UsersController {
    private readonly usersService;
    private readonly productsService;
    constructor(usersService: UsersService, productsService: ProductService);
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {})[]>;
    findOneByMail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
    setAwatar(file: Express.Multer.File, request: RequestWithUser): Promise<import("./user.entity").default>;
    updateProfile(updateData: UpdateUserDto, request: RequestWithUser): Promise<import("./user.entity").default>;
    getUserProducts(id: number): Promise<({
        author: {
            name: string;
            awatar: string;
        };
    } & import("@prisma/client/runtime").GetResult<{
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
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
    getMyPlans(request: RequestWithUser): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {})[]>;
}
