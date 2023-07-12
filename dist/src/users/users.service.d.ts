import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';
import SetAwatarDto from './dto/set-awatar.dto';
import User from './user.entity';
export declare class UsersService {
    private readonly prismaService;
    private readonly productService;
    constructor(prismaService: PrismaService, productService: ProductService);
    create(userData: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
    updateProfile(updateData: UpdateUserDto, user: User): Promise<User>;
    updateAwatar(setAwatarDto: SetAwatarDto, user: User): Promise<User>;
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
    getByEmail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
    getProductsByUserId(id: number): Promise<({
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
    getMyPlans(user: User): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
}
