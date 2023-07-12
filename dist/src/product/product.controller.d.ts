import { ProductService } from './product.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
    updateProduct(id: number, updateProductDto: UpdateProductDto, request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
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
    deleteProduct(request: RequestWithUser, id: number): Promise<import("@prisma/client/runtime").GetResult<{
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
    getOneProducts(id: number): Promise<{
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
    getAllPlansProductForUser(id: number): Promise<any[]>;
    getAllPlansProductForAdmin(request: RequestWithUser, id: number): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        clientId: number;
        dayTime: Date;
        idProduct: number;
    }, unknown> & {})[]>;
    register(registrationData: CreateProductDto, request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
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
