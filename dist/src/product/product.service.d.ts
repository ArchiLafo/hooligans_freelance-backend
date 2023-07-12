import CreateProductDto from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import UpdateProductDto from './dto/update-product.dto';
import User from 'src/users/user.entity';
export declare class ProductService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(productData: CreateProductDto, user: User): Promise<import("@prisma/client/runtime").GetResult<{
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
    updateProduct(updateProductDto: UpdateProductDto, user: User, idProduct: number): Promise<import("@prisma/client/runtime").GetResult<{
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
    deleteProduct(idProduct: number, user: User): Promise<import("@prisma/client/runtime").GetResult<{
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
    getAllProducts(): Promise<({
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
    getOneProduct(id: number): Promise<{
        author: {
            name: string;
            awatar: string;
            email: string;
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
    }, unknown> & {}>;
    getProductsByUser(user: User): Promise<({
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
    getAllPlansProductForUsers(productId: any): Promise<any[]>;
    getAllPlansProductForAdmin(productId: any): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
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
