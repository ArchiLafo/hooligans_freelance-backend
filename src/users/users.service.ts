import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';
import SetAwatarDto from './dto/set-awatar.dto';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService, private readonly productService: ProductService) {}

  // Создане юзеров
  async create(userData: CreateUserDto) {
    const role = userData.role;
    const newUser = await this.prismaService.user.create({
      data: userData,
    });
    return newUser;
  }

  // Обновление юзера
  async updateProfile(updateData: UpdateUserDto, user: User) {
    if (user.name == updateData.name) {
      throw new HttpException('You already have this name', HttpStatus.BAD_REQUEST)
    }
    user = await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: updateData
    });
    user.password = undefined;
    return user;
  }

  // Обновление аватара юзера
  async updateAwatar(setAwatarDto: SetAwatarDto, user: User) {
    user = await this.prismaService.user.update({
      where: { 
        id: user.id,
      }, 
      data: { 
        awatar: setAwatarDto.awatar,
      }});
    user.password = undefined;
    return user;
  }

  // Поиск всех юзеров
  async findAll() {
    return await this.prismaService.user.findMany();
  }

  // Получение юзреров по id
  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND, );
  }
  

  // Получение услуг юзера
  async getProductsByUserId(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });  
    if (user == null) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND,)
    }  
    return await this.productService.getProductsByUser(user)
  }

  // Получение услуг, на которые записан юзер
  async getMyPlans(user: User)
  {
    return await this.prismaService.plan.findMany(
      {
        where:
        {
          clientId: user.id
        }
      }
    )
  }

  // Получение юзера по id
  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND,
    );
  }
}