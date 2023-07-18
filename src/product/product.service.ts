import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import UpdateProductDto from './dto/update-product.dto';
import { User } from '@prisma/client';
import { DatetimeCustomization } from './datetime.configure';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
    // Создание услуг
    async create(productData: CreateProductDto, user: User) 
    {
        const newProduct = await this.prismaService.product.create({
          data: { 
            ...productData,
            authorId: user.id
          }
        });
        return newProduct;
      }

    // Обновление услуг
    async updateProduct(updateProductDto: UpdateProductDto, user: User, idProduct: number) 
    {
      return await this.prismaService.product.update({
        where: { 
          id: idProduct
        }, 
        data: updateProductDto});
    }

    // Удаление услуг
    async deleteProduct(idProduct: number, user: User) 
    {
      await this.prismaService.plan.deleteMany(
        {
          where:
          {
            idProduct: idProduct
          }
        }
      )
      return await this.prismaService.product.delete({
        where: 
        { 
          id: idProduct
        }
      }); 
    }
    
    // Получение всех услуг
    async getAllProducts() 
    {
      const allProducts = await this.prismaService.product.findMany( {
          include: {
            author: {
              select: {
                name: true,
                avatar: true    
              }
            }
          }
        }
      );
      return allProducts;
    }
    
    // Получение информации конкретной услуги
    async getOneProduct(id: number) 
    {
      const product = await this.prismaService.product.findUnique( {
        where:
        {
          id: id
        },
        include: {
          author: {
            select: {
              name: true,
              avatar: true, 
              email: true   
            }
          },
          category: true,
        }
      });
      return product
    }
    
    // Получение услуг юзера
    async getProductsByUser(user: User) 
    {
      const products = await this.prismaService.product.findMany({
        where: {
          authorId: user.id
        },
        include:
        {
          author:
          {
            select:
            {
              name: true,
              avatar: true
            }
          }
        }
      })
      return products;
    }

    // Получение записей на услуги, на которую ещё никто не записался
    async getAllPlansProductForUsers(productId) {
      //Проверку незя удалять, ибо у нас не стоят гуарды. А не стоят гуарды, потому что данный метод могут использовать прямо все
      if (!(await this.prismaService.product.findUnique( {
          where: {
            id: productId
          }
        }))
      ) {
        throw new NotFoundException('Not found this product')
      }
      return await this.prismaService.plan.findMany({
        where: {
        idProduct: productId,
        clientId: null
      },
      select: {
        id: true,
        datetime: true,
      }
    })
  }

    // Получение записей на услуги, на которую кто-нибудь записался
    async getAllPlansProductForAdmin(productId) 
    {
      const busyPlans = await this.prismaService.plan.findMany({where: {
        idProduct: productId,
        clientId: {
          not: null
        },
      },
      include: {
        client: {
          select: {
            name: true,
            avatar: true,
          }
        },
      }
    })
    return busyPlans;
    }

    // Получение услуги по id
    async getById(id: number) 
    {
      console.log("id: " + id)
      const product = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });
      if (product) {
        return product;
      }
      throw new HttpException(
        'Product with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
}